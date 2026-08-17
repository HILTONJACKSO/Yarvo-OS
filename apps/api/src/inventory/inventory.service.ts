import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AppWebsocketGateway } from '../websocket/app-websocket.gateway';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { CreateCountDto } from './dto/create-count.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateCountItemsDto } from './dto/update-count-items.dto';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { CreateIssueDto } from './dto/create-issue.dto';

@Injectable()
export class InventoryService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wsGateway: AppWebsocketGateway,
  ) {}

  async getDashboardStats(businessId: string) {
    const totalValueResult = await this.prisma.stockBalance.aggregate({
      where: { businessId },
      _sum: {
        stockValue: true,
      },
    });

    const lowStockCount = await this.prisma.stockBalance.count({
      where: {
        businessId,
        quantityAvailable: { lte: 10, gt: 0 }
      }
    });

    const outOfStockCount = await this.prisma.stockBalance.count({
      where: { businessId, quantityAvailable: { lte: 0 } }
    });

    const openOrdersCount = await this.prisma.purchaseOrder.count({
      where: { businessId, status: 'OPEN' }
    });

    return {
      totalStockValue: totalValueResult._sum.stockValue || 0,
      lowStockItems: lowStockCount,
      outOfStock: outOfStockCount,
      openPurchaseOrders: openOrdersCount,
    };
  }

  async getItems() {
    const items = await this.prisma.inventoryItem.findMany({
      orderBy: { name: 'asc' }
    });

    const balances = await this.prisma.stockBalance.groupBy({
      by: ['inventoryItemId'],
      _sum: {
        quantityAvailable: true
      }
    });

    const balanceMap = new Map(balances.map(b => [b.inventoryItemId, b._sum.quantityAvailable || 0]));

    return items.map(item => ({
      ...item,
      available: balanceMap.get(item.id) || 0
    }));
  }

  async getStockLevels() {
    const balances = await this.prisma.stockBalance.findMany();
    const items = await this.prisma.inventoryItem.findMany();
    const locations = await this.prisma.stockLocation.findMany();

    const itemMap = new Map(items.map(i => [i.id, i]));
    const locationMap = new Map(locations.map(l => [l.id, l]));

    return balances.map(b => {
      const item = itemMap.get(b.inventoryItemId);
      const location = locationMap.get(b.stockLocationId);
      
      let status = 'Healthy';
      const minLevel = item?.minimumStockLevel || 0;
      if (b.quantityAvailable <= 0) {
        status = 'Out of Stock';
      } else if (b.quantityAvailable <= minLevel) {
        status = 'Low';
      }

      return {
        id: b.id,
        item: item ? `${item.name} (${item.code})` : 'Unknown Item',
        location: location ? location.name : 'Unknown Location',
        onHand: b.quantityOnHand,
        reserved: b.quantityReserved,
        available: b.quantityAvailable,
        minimum: minLevel,
        status: status
      };
    });
  }

  async getMovements() {
    const movements = await this.prisma.stockMovement.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    const items = await this.prisma.inventoryItem.findMany();
    const locations = await this.prisma.stockLocation.findMany();

    const itemMap = new Map(items.map(i => [i.id, i]));
    const locationMap = new Map(locations.map(l => [l.id, l]));

    return movements.map(m => {
      const item = itemMap.get(m.inventoryItemId);
      const fromLoc = m.fromLocationId ? locationMap.get(m.fromLocationId)?.name || 'Unknown' : 'External';
      const toLoc = m.toLocationId ? locationMap.get(m.toLocationId)?.name || 'External' : 'External';
      
      let isPositive = false;
      if (m.movementType.includes('RECEIPT') || m.movementType.includes('IN')) {
        isPositive = true;
      } else if (m.movementType === 'ADJUSTMENT' && m.toLocationId) {
        isPositive = true;
      }

      const qtyStr = `${isPositive ? '+' : '-'}${m.quantity}`;

      const dateStr = m.createdAt.toISOString().replace('T', ' ').substring(0, 16);

      return {
        id: m.id,
        number: m.movementNumber,
        date: dateStr,
        item: item ? `${item.name} (${item.code})` : 'Unknown Item',
        type: m.movementType,
        from: fromLoc,
        to: toLoc,
        qty: qtyStr,
        cost: m.totalCost ? `$${m.totalCost.toFixed(2)}` : '-',
        ref: m.referenceId || m.referenceType || '-',
        by: 'Admin'
      };
    });
  }

  async getTransfers() {
    return this.prisma.stockTransfer.findMany({
      orderBy: { createdAt: 'desc' }
    });
  }

  async createTransfer(businessId: string, branchId: string, userId: string, data: CreateTransferDto) {
    const transferNumber = `TRF-${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    return this.prisma.$transaction(async (tx) => {
      const transfer = await tx.stockTransfer.create({
        data: {
          businessId,
          branchId,
          transferNumber,
          sourceLocationId: data.sourceLocationId,
          destinationLocationId: data.destinationLocationId,
          status: data.status || 'PENDING',
          requestedByUserId: data.requestedByUserId || userId,
          notes: data.notes,
        },
      });

      if (data.items && data.items.length > 0) {
        const itemPromises = data.items.map(async item => {
          const transferItem = await tx.stockTransferItem.create({
            data: {
              stockTransferId: transfer.id,
              inventoryItemId: item.inventoryItemId,
              requestedQuantity: item.requestedQuantity,
              unitId: item.unitId,
            }
          });

          // If the transfer is completed, execute the stock movement
          if (data.status === 'COMPLETED') {
            // Deduct from source
            let sourceBalance = await tx.stockBalance.findFirst({
              where: {
                stockLocationId: data.sourceLocationId,
                inventoryItemId: item.inventoryItemId,
              }
            });

            if (sourceBalance) {
              await tx.stockBalance.update({
                where: { id: sourceBalance.id },
                data: {
                  quantityOnHand: sourceBalance.quantityOnHand - item.requestedQuantity,
                  quantityAvailable: sourceBalance.quantityAvailable - item.requestedQuantity,
                  updatedAt: new Date(),
                }
              });
            } else {
              await tx.stockBalance.create({
                data: {
                  businessId,
                  branchId,
                  stockLocationId: data.sourceLocationId,
                  inventoryItemId: item.inventoryItemId,
                  quantityOnHand: -item.requestedQuantity,
                  quantityReserved: 0,
                  quantityAvailable: -item.requestedQuantity,
                }
              });
            }

            const movementNumber = `MOV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

            // Create movement out
            await tx.stockMovement.create({
              data: {
                businessId,
                branchId,
                movementNumber: `${movementNumber}-OUT`,
                inventoryItemId: item.inventoryItemId,
                movementType: 'TRANSFER_OUT',
                fromLocationId: data.sourceLocationId,
                toLocationId: data.destinationLocationId,
                quantity: item.requestedQuantity,
                unitId: item.unitId,
                baseQuantity: item.requestedQuantity,
                referenceType: 'TRANSFER',
                referenceId: transfer.id,
                reason: `Transfer to ${data.destinationLocationId}`,
                status: 'COMPLETED',
                createdByUserId: userId,
              }
            });

            // Add to destination
            let destBalance = await tx.stockBalance.findFirst({
              where: {
                stockLocationId: data.destinationLocationId,
                inventoryItemId: item.inventoryItemId,
              }
            });

            if (destBalance) {
              await tx.stockBalance.update({
                where: { id: destBalance.id },
                data: {
                  quantityOnHand: destBalance.quantityOnHand + item.requestedQuantity,
                  quantityAvailable: destBalance.quantityAvailable + item.requestedQuantity,
                  updatedAt: new Date(),
                }
              });
            } else {
              await tx.stockBalance.create({
                data: {
                  businessId,
                  branchId,
                  stockLocationId: data.destinationLocationId,
                  inventoryItemId: item.inventoryItemId,
                  quantityOnHand: item.requestedQuantity,
                  quantityReserved: 0,
                  quantityAvailable: item.requestedQuantity,
                }
              });
            }

            // Create movement in
            await tx.stockMovement.create({
              data: {
                businessId,
                branchId,
                movementNumber: `${movementNumber}-IN`,
                inventoryItemId: item.inventoryItemId,
                movementType: 'TRANSFER_IN',
                fromLocationId: data.sourceLocationId,
                toLocationId: data.destinationLocationId,
                quantity: item.requestedQuantity,
                unitId: item.unitId,
                baseQuantity: item.requestedQuantity,
                referenceType: 'TRANSFER',
                referenceId: transfer.id,
                reason: `Transfer from ${data.sourceLocationId}`,
                status: 'COMPLETED',
                createdByUserId: userId,
              }
            });
          }

          return transferItem;
        });
        await Promise.all(itemPromises);
      }

      return transfer;
    });
  }

  async createDepartmentIssue(businessId: string, branchId: string, userId: string, data: CreateIssueDto) {
    const issueNumber = `ISSUE-${new Date().getFullYear()}${(new Date().getMonth()+1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;

    return this.prisma.$transaction(async (tx) => {
      const issue = await tx.departmentStockIssue.create({
        data: {
          businessId,
          branchId,
          issueNumber,
          sourceLocationId: data.sourceLocationId,
          departmentId: data.departmentId,
          status: data.status || 'PENDING',
          requestedByUserId: data.requestedByUserId || userId,
          purpose: data.purpose,
        },
      });

      if (data.items && data.items.length > 0) {
        const itemPromises = data.items.map(async item => {
          const issueItem = await tx.departmentStockIssueItem.create({
            data: {
              departmentStockIssueId: issue.id,
              inventoryItemId: item.inventoryItemId,
              requestedQuantity: item.requestedQuantity,
              unitId: item.unitId,
            }
          });

          // If the issue is completed/issued, execute the stock movement
          if (data.status === 'ISSUED') {
            // Deduct from source
            let sourceBalance = await tx.stockBalance.findFirst({
              where: {
                stockLocationId: data.sourceLocationId,
                inventoryItemId: item.inventoryItemId,
              }
            });

            if (sourceBalance) {
              await tx.stockBalance.update({
                where: { id: sourceBalance.id },
                data: {
                  quantityOnHand: sourceBalance.quantityOnHand - item.requestedQuantity,
                  quantityAvailable: sourceBalance.quantityAvailable - item.requestedQuantity,
                  updatedAt: new Date(),
                }
              });
            } else {
              await tx.stockBalance.create({
                data: {
                  businessId,
                  branchId,
                  stockLocationId: data.sourceLocationId,
                  inventoryItemId: item.inventoryItemId,
                  quantityOnHand: -item.requestedQuantity,
                  quantityReserved: 0,
                  quantityAvailable: -item.requestedQuantity,
                }
              });
            }

            const movementNumber = `MOV-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

            // Create movement out
            await tx.stockMovement.create({
              data: {
                businessId,
                branchId,
                movementNumber: `${movementNumber}-ISSUE`,
                inventoryItemId: item.inventoryItemId,
                movementType: 'ISSUE',
                fromLocationId: data.sourceLocationId,
                quantity: item.requestedQuantity,
                unitId: item.unitId,
                baseQuantity: item.requestedQuantity,
                referenceType: 'ISSUE',
                referenceId: issue.id,
                reason: data.purpose || `Issued to department ${data.departmentId}`,
                status: 'COMPLETED',
                createdByUserId: userId,
              }
            });
          }

          return issueItem;
        });
        await Promise.all(itemPromises);
      }

      return issue;
    });
  }

  async getRecipes() {
    const recipes = await this.prisma.recipe.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // Enrich with catalog item names, location names, and ingredient counts
    const catalogItemIds = [...new Set(recipes.map(r => r.catalogItemId).filter((id): id is string => id !== null && id !== undefined))];
    const locationIds = [...new Set(recipes.map(r => r.preparationLocationId).filter((id): id is string => id !== null && id !== undefined))];
    const recipeIds = recipes.map(r => r.id);

    const [catalogItems, locations, allIngredients] = await Promise.all([
      catalogItemIds.length
        ? this.prisma.catalogItem.findMany({ where: { id: { in: catalogItemIds } }, select: { id: true, name: true } })
        : [],
      locationIds.length
        ? this.prisma.stockLocation.findMany({ where: { id: { in: locationIds } }, select: { id: true, name: true } })
        : [],
      this.prisma.recipeIngredient.findMany({ where: { recipeId: { in: recipeIds } } }),
    ]);

    const catalogMap = new Map(catalogItems.map(c => [c.id, c]));
    const locationMap = new Map(locations.map(l => [l.id, l]));
    const ingredientCountMap = new Map<string, number>();
    for (const ing of allIngredients) {
      ingredientCountMap.set(ing.recipeId, (ingredientCountMap.get(ing.recipeId) || 0) + 1);
    }

    return recipes.map(r => ({
      ...r,
      catalogItem: r.catalogItemId ? catalogMap.get(r.catalogItemId) : null,
      preparationLocation: r.preparationLocationId ? locationMap.get(r.preparationLocationId) : null,
      ingredientCount: ingredientCountMap.get(r.id) || 0,
    }));
  }

  async createRecipe(businessId: string, branchId: string, data: any) {
    const recipeVersion = `v${new Date().getFullYear()}.${(new Date().getMonth()+1).toString().padStart(2,'0')}`;

    const recipe = await this.prisma.recipe.create({
      data: {
        businessId,
        branchId,
        catalogItemId: data.catalogItemId || null,
        variationId: data.variationId || null,
        recipeVersion,
        outputQuantity: data.outputQuantity || 1,
        outputUnitId: data.outputUnitId || 'unit',
        preparationLocationId: data.preparationLocationId || null,
        effectiveFrom: new Date(),
        status: data.status || 'ACTIVE',
      }
    });

    // Save ingredients
    if (data.ingredients && data.ingredients.length > 0) {
      for (const ing of data.ingredients) {
        await this.prisma.recipeIngredient.create({
          data: {
            recipeId: recipe.id,
            inventoryItemId: ing.inventoryItemId,
            quantity: ing.quantity,
            unitId: ing.unitId,
            baseQuantity: ing.quantity,
            wastePercentage: ing.wastePercentage || 0,
            optional: ing.optional || false,
          }
        });
      }
    }

    return recipe;
  }

  async getCounts() {
    const rawCounts = await this.prisma.stockCount.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const result = [];
    for (const count of rawCounts) {
      const countLocations = await this.prisma.stockCountLocation.findMany({
        where: { stockCountId: count.id }
      });
      let locationNames = [];
      for (const cl of countLocations) {
        const loc = await this.prisma.stockLocation.findUnique({ where: { id: cl.stockLocationId } });
        if (loc) locationNames.push(loc.name);
      }
      const locationStr = locationNames.length > 0 ? locationNames.join(', ') : 'Global Count';

      const items = await this.prisma.stockCountItem.findMany({
        where: { stockCountId: count.id }
      });
      
      let totalVariance = null;
      let hasCompletedItems = false;
      for (const item of items) {
        if (item.varianceCost !== null) {
          if (totalVariance === null) totalVariance = 0;
          totalVariance += item.varianceCost;
          hasCompletedItems = true;
        }
      }

      result.push({
        id: count.id,
        number: count.countNumber,
        location: locationStr,
        date: count.startedAt ? count.startedAt.toISOString().split('T')[0] : (count.createdAt ? count.createdAt.toISOString().split('T')[0] : '-'),
        type: count.countType.replace('_', ' '),
        blind: count.blindCount,
        variance: totalVariance,
        status: count.status
      });
    }

    return result;
  }

  async getCountById(id: string) {
    const count = await this.prisma.stockCount.findUnique({ where: { id } });
    if (!count) throw new Error('Count not found');

    const countLocations = await this.prisma.stockCountLocation.findMany({ where: { stockCountId: count.id } });
    const locationNames = [];
    for (const cl of countLocations) {
      const loc = await this.prisma.stockLocation.findUnique({ where: { id: cl.stockLocationId } });
      if (loc) locationNames.push(loc.name);
    }

    const items = await this.prisma.stockCountItem.findMany({ where: { stockCountId: count.id } });
    const mappedItems = [];
    for (const item of items) {
      const inventoryItem = await this.prisma.inventoryItem.findUnique({ where: { id: item.inventoryItemId } });
      const unit = inventoryItem?.baseUnitId ? await this.prisma.unitOfMeasure.findUnique({ where: { id: inventoryItem.baseUnitId } }) : null;
      
      mappedItems.push({
        id: item.id, // the StockCountItem ID
        itemId: inventoryItem?.id,
        name: inventoryItem?.name || 'Unknown Item',
        code: inventoryItem?.code || '-',
        unit: unit?.code || 'unit',
        systemQuantity: item.systemQuantity,
        countedQuantity: item.countedQuantity,
        varianceQuantity: item.varianceQuantity,
        varianceCost: item.varianceCost,
        unitCost: item.unitCost
      });
    }

    return {
      ...count,
      locationStr: locationNames.length > 0 ? locationNames.join(', ') : 'Global Count',
      items: mappedItems
    };
  }

  async updateCountItems(id: string, data: UpdateCountItemsDto) {
    for (const itemUpdate of data.items) {
      // Find the StockCountItem record
      const countItem = await this.prisma.stockCountItem.findUnique({ where: { id: itemUpdate.itemId } });
      if (!countItem) continue;

      const varianceQty = itemUpdate.countedQuantity - (countItem.systemQuantity || 0);
      const varianceCost = varianceQty * (countItem.unitCost || 0);

      await this.prisma.stockCountItem.update({
        where: { id: countItem.id },
        data: {
          countedQuantity: itemUpdate.countedQuantity,
          varianceQuantity: varianceQty,
          varianceCost: varianceCost,
          countedAt: new Date(),
          countedByUserId: 'user-1'
        }
      });
    }

    return this.getCountById(id);
  }

  async completeCount(id: string) {
    const count = await this.prisma.stockCount.findUnique({
      where: { id }
    });

    if (!count) throw new Error('Count not found');
    if (count.status === 'COMPLETED') throw new Error('Count is already completed');

    const items = await this.prisma.stockCountItem.findMany({
      where: { stockCountId: count.id }
    });

    for (const item of items) {
      if (item.countedQuantity === null || item.countedQuantity === undefined) {
        continue;
      }

      // Find existing StockBalance
      const existingBalance = await this.prisma.stockBalance.findFirst({
        where: {
          inventoryItemId: item.inventoryItemId,
          stockLocationId: item.stockLocationId
        }
      });

      let newQuantityAvailable = item.countedQuantity;
      if (existingBalance) {
        newQuantityAvailable = item.countedQuantity - existingBalance.quantityReserved;
        
        await this.prisma.stockBalance.update({
          where: { id: existingBalance.id },
          data: {
            quantityOnHand: item.countedQuantity,
            quantityAvailable: newQuantityAvailable
          }
        });
      } else {
        await this.prisma.stockBalance.create({
          data: {
            businessId: count.businessId,
            branchId: count.branchId,
            inventoryItemId: item.inventoryItemId,
            stockLocationId: item.stockLocationId,
            quantityOnHand: item.countedQuantity,
            quantityReserved: 0,
            quantityAvailable: item.countedQuantity
          }
        });
      }

      const varianceQty = item.varianceQuantity || 0;
      if (varianceQty !== 0) {
        const itemInfo = await this.prisma.inventoryItem.findUnique({ where: { id: item.inventoryItemId } });
        
        await this.prisma.stockMovement.create({
          data: {
            businessId: count.businessId,
            branchId: count.branchId,
            movementNumber: `MOV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
            inventoryItemId: item.inventoryItemId,
            movementType: 'ADJUSTMENT',
            fromLocationId: varianceQty < 0 ? item.stockLocationId : null,
            toLocationId: varianceQty > 0 ? item.stockLocationId : null,
            quantity: Math.abs(varianceQty),
            unitId: itemInfo?.baseUnitId || '',
            baseQuantity: Math.abs(varianceQty),
            referenceType: 'STOCK_COUNT',
            referenceId: count.id,
            reason: 'Stock Count Variance',
            status: 'COMPLETED',
            createdByUserId: count.createdByUserId
          }
        });
      }
    }

    const updatedCount = await this.prisma.stockCount.update({
      where: { id },
      data: {
        status: 'COMPLETED',
        submittedAt: new Date(),
        approvedByUserId: count.createdByUserId
      }
    });

    return updatedCount;
  }

  async createCount(businessId: string, data: CreateCountDto) {
    const countNumber = `CNT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newCount = await this.prisma.stockCount.create({
      data: {
        businessId,
        branchId: 'branch-1',
        countNumber,
        name: data.name,
        countType: data.countType,
        status: 'IN_PROGRESS',
        startedAt: new Date(),
        createdByUserId: 'user-1',
        blindCount: data.blindCount || false,
        freezeMovements: data.freezeMovements || false,
        notes: data.notes
      }
    });

    if (data.locationIds && data.locationIds.length > 0) {
      for (const locId of data.locationIds) {
        await this.prisma.stockCountLocation.create({
          data: {
            stockCountId: newCount.id,
            stockLocationId: locId
          }
        });

        // For simplicity, find all ACTIVE inventory items and add them to the count for this location
        const allItems = await this.prisma.inventoryItem.findMany({
          where: { businessId, status: 'ACTIVE' }
        });

        for (const item of allItems) {
          // Check if there is an existing balance
          const balance = await this.prisma.stockBalance.findFirst({
            where: {
              inventoryItemId: item.id,
              stockLocationId: locId
            }
          });

          await this.prisma.stockCountItem.create({
            data: {
              stockCountId: newCount.id,
              inventoryItemId: item.id,
              stockLocationId: locId,
              systemQuantity: balance ? balance.quantityAvailable : 0,
              unitCost: balance ? balance.averageUnitCost : item.initialUnitCost || 0
            }
          });
        }
      }
    }

    return newCount;
  }

  async getWaste() {
    const wastes = await this.prisma.inventoryWaste.findMany({
      orderBy: { createdAt: 'desc' }
    });

    const itemIds = [...new Set(wastes.map(w => w.inventoryItemId).filter((id): id is string => id !== null && id !== undefined))];
    const locationIds = [...new Set(wastes.map(w => w.stockLocationId).filter((id): id is string => id !== null && id !== undefined))];
    const unitIds = [...new Set(wastes.map(w => w.unitId).filter((id): id is string => id !== null && id !== undefined))];

    const [items, locations, units] = await Promise.all([
      itemIds.length ? this.prisma.inventoryItem.findMany({ where: { id: { in: itemIds } } }) : [],
      locationIds.length ? this.prisma.stockLocation.findMany({ where: { id: { in: locationIds } } }) : [],
      unitIds.length ? this.prisma.unitOfMeasure.findMany({ where: { id: { in: unitIds } } }) : [],
    ]);

    const itemMap = new Map(items.map(i => [i.id, i]));
    const locationMap = new Map(locations.map(l => [l.id, l]));
    const unitMap = new Map(units.map(u => [u.id, u]));

    return wastes.map(w => ({
      ...w,
      inventoryItem: itemMap.get(w.inventoryItemId) || null,
      stockLocation: locationMap.get(w.stockLocationId) || null,
      unit: unitMap.get(w.unitId) || null,
    }));
  }

  async createWaste(businessId: string, branchId: string, userId: string, data: any) {
    const item = await this.prisma.inventoryItem.findUnique({ where: { id: data.inventoryItemId } });
    if (!item) throw new Error('Item not found');

    const itemCost = item.averageUnitCost || item.initialUnitCost || item.standardCost || 0;
    const totalCost = data.quantity * itemCost;
    const wasteNumber = `WST-${Math.floor(1000 + Math.random() * 9000)}`;

    const waste = await this.prisma.inventoryWaste.create({
      data: {
        businessId,
        branchId,
        wasteNumber,
        inventoryItemId: data.inventoryItemId,
        stockLocationId: data.stockLocationId,
        wasteType: data.wasteType || 'SPOILAGE',
        quantity: data.quantity,
        unitId: data.unitId || item.baseUnitId,
        baseQuantity: data.quantity, // simplify assuming same unit
        unitCost: itemCost,
        totalCost,
        reason: data.reason || '',
        reportedByUserId: userId,
        status: data.status || 'APPROVED', // Assuming direct approval for now
      }
    });

    // Also deduct stock if it's approved
    if (waste.status === 'APPROVED') {
      await this.prisma.inventoryConsumption.create({
        data: {
          businessId,
          branchId,
          inventoryItemId: waste.inventoryItemId,
          stockLocationId: waste.stockLocationId,
          quantity: waste.quantity,
          unitCost: waste.unitCost,
          totalCost: waste.totalCost,
          consumptionType: 'WASTE',
          status: 'COMPLETED'
        }
      });
    }

    return waste;
  }
  async updateWasteStatus(id: string, status: string, userId: string) {
    const waste = await this.prisma.inventoryWaste.findUnique({ where: { id } });
    if (!waste) throw new Error('Waste record not found');
    if (waste.status !== 'PENDING') throw new Error('Only pending waste records can be updated');

    const updated = await this.prisma.inventoryWaste.update({
      where: { id },
      data: {
        status,
        approvedByUserId: userId,
      }
    });

    if (status === 'APPROVED') {
      await this.prisma.inventoryConsumption.create({
        data: {
          businessId: waste.businessId,
          branchId: waste.branchId,
          inventoryItemId: waste.inventoryItemId,
          stockLocationId: waste.stockLocationId,
          quantity: waste.quantity,
          unitCost: waste.unitCost,
          totalCost: waste.totalCost,
          consumptionType: 'WASTE',
          status: 'COMPLETED'
        }
      });
    }

    return updated;
  }

  async getCategories() {
    return this.prisma.inventoryCategory.findMany();
  }

  async getUnits() {
    return this.prisma.unitOfMeasure.findMany();
  }

  async getLocations() {
    return this.prisma.stockLocation.findMany();
  }

  async createLocation(businessId: string, data: CreateLocationDto) {
    return this.prisma.stockLocation.create({
      data: {
        businessId,
        branchId: 'branch-1',
        name: data.name,
        code: data.code,
        locationType: data.locationType,
        allowsReceiving: data.allowsReceiving !== false,
        allowsIssuing: data.allowsIssuing !== false,
        allowsSalesDeduction: data.allowsSalesDeduction || false,
        status: data.status || 'ACTIVE'
      }
    });
  }

  async create(businessId: string, data: CreateInventoryDto) {
    let categoryId = data.categoryId;

    if (categoryId.startsWith('ADD_NEW:')) {
      const categoryName = categoryId.split(':')[1];
      const newCategory = await this.prisma.inventoryCategory.create({
        data: {
          businessId,
          name: categoryName,
          code: categoryName.toUpperCase().replace(/\s+/g, '_').substring(0, 10),
          status: 'ACTIVE'
        }
      });
      categoryId = newCategory.id;
    }

    const item = await this.prisma.inventoryItem.create({
      data: {
        businessId,
        name: data.name,
        code: data.code,
        barcode: data.barcode,
        inventoryType: data.inventoryType,
        categoryId: categoryId,
        brand: data.brand,
        description: data.description,
        baseUnitId: data.baseUnitId,
        purchaseUnitId: data.purchaseUnitId,
        issueUnitId: data.issueUnitId,
        minimumStockLevel: data.minimumStockLevel,
        reorderLevel: data.reorderLevel,
        maximumStockLevel: data.maximumStockLevel,
        reorderQuantity: data.reorderQuantity,
        allowNegativeStock: data.allowNegativeStock || false,
        trackBatch: data.trackBatch || false,
        trackExpiry: data.trackExpiry || false,
        stockMethod: data.stockMethod || 'FIFO',
        initialUnitCost: data.initialUnitCost,
        standardCost: data.standardCost,
        preferredSupplierId: data.preferredSupplierId,
        currency: 'USD',
        status: 'ACTIVE'
      }
    });

    if (data.purchaseUnitId && data.purchaseConversionFactor && data.purchaseUnitId !== data.baseUnitId) {
      await this.prisma.inventoryUnitConversion.create({
        data: {
          inventoryItemId: item.id,
          fromUnitId: data.purchaseUnitId,
          toUnitId: data.baseUnitId,
          conversionFactor: data.purchaseConversionFactor
        }
      });
    }

    return item;
  }

  findAll(businessId?: string) {
    return `This action returns all inventory`;
  }

  async findOne(id: string) {
    return this.prisma.inventoryItem.findUnique({
      where: { id }
    });
  }

  async update(id: string, data: UpdateInventoryDto, businessId: string = 'bus-kwalee-1') {
    let finalCategoryId = data.categoryId;

    if (finalCategoryId?.startsWith('ADD_NEW:')) {
      const newCategoryName = finalCategoryId.split(':')[1];
      const newCategory = await this.prisma.inventoryCategory.create({
        data: {
          businessId,
          name: newCategoryName,
          code: `CAT-${Date.now()}`,
          status: 'ACTIVE'
        }
      });
      finalCategoryId = newCategory.id;
    }

    const item = await this.prisma.inventoryItem.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.code && { code: data.code }),
        ...(data.barcode !== undefined && { barcode: data.barcode }),
        ...(data.inventoryType && { inventoryType: data.inventoryType }),
        ...(finalCategoryId && { categoryId: finalCategoryId }),
        ...(data.brand !== undefined && { brand: data.brand }),
        ...(data.description !== undefined && { description: data.description }),
        ...(data.baseUnitId && { baseUnitId: data.baseUnitId }),
        ...(data.purchaseUnitId !== undefined && { purchaseUnitId: data.purchaseUnitId }),
        ...(data.issueUnitId !== undefined && { issueUnitId: data.issueUnitId }),
        ...(data.minimumStockLevel !== undefined && { minimumStockLevel: data.minimumStockLevel }),
        ...(data.reorderLevel !== undefined && { reorderLevel: data.reorderLevel }),
        ...(data.maximumStockLevel !== undefined && { maximumStockLevel: data.maximumStockLevel }),
        ...(data.reorderQuantity !== undefined && { reorderQuantity: data.reorderQuantity }),
        ...(data.allowNegativeStock !== undefined && { allowNegativeStock: data.allowNegativeStock }),
        ...(data.trackBatch !== undefined && { trackBatch: data.trackBatch }),
        ...(data.trackExpiry !== undefined && { trackExpiry: data.trackExpiry }),
        ...(data.stockMethod && { stockMethod: data.stockMethod }),
        ...(data.initialUnitCost !== undefined && { initialUnitCost: data.initialUnitCost }),
        ...(data.standardCost !== undefined && { standardCost: data.standardCost }),
        ...(data.preferredSupplierId !== undefined && { preferredSupplierId: data.preferredSupplierId }),
        ...(data.status && { status: data.status })
      }
    });

    if (data.purchaseUnitId && data.purchaseConversionFactor) {
      // Very naive implementation: just find first and update, or create
      const existingConv = await this.prisma.inventoryUnitConversion.findFirst({
        where: { inventoryItemId: id, fromUnitId: data.purchaseUnitId }
      });
      if (existingConv) {
        await this.prisma.inventoryUnitConversion.update({
          where: { id: existingConv.id },
          data: { conversionFactor: data.purchaseConversionFactor }
        });
      } else {
        await this.prisma.inventoryUnitConversion.create({
          data: {
            inventoryItemId: id,
            fromUnitId: data.purchaseUnitId,
            toUnitId: data.baseUnitId!,
            conversionFactor: data.purchaseConversionFactor
          }
        });
      }
    }

    return item;
  }

  async remove(id: string) {
    return this.prisma.inventoryItem.delete({
      where: { id }
    });
  }
}
