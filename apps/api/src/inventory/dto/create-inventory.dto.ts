export class CreateInventoryDto {
  name: string;

  code: string;

  barcode?: string;

  inventoryType: string;

  categoryId: string; // Could be 'ADD_NEW:custom category name'

  brand?: string;

  description?: string;

  baseUnitId: string;

  purchaseUnitId?: string;

  issueUnitId?: string;

  purchaseConversionFactor?: number;

  minimumStockLevel?: number;

  reorderLevel?: number;

  maximumStockLevel?: number;

  reorderQuantity?: number;

  allowNegativeStock?: boolean;

  trackBatch?: boolean;

  trackExpiry?: boolean;

  stockMethod: string;

  initialUnitCost?: number;

  standardCost?: number;

  preferredSupplierId?: string;

  isRecipeIngredient?: boolean;

  isDirectSale?: boolean;

  isMinibar?: boolean;

  isHousekeeping?: boolean;

  status?: 'ACTIVE' | 'DRAFT';
}
