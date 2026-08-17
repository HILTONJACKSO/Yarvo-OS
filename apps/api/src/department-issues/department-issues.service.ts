import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DepartmentIssuesService {
  constructor(private readonly prisma: PrismaService) {}

  private async enrichIssues(issues: any[]) {
    if (!issues.length) return [];

    // Collect all unique IDs we need to look up
    const locationIds = [...new Set(issues.map(i => i.sourceLocationId).filter(Boolean))];
    const departmentIds = [...new Set(issues.map(i => i.departmentId).filter(Boolean))];
    const issueIds = issues.map(i => i.id);

    // Batch fetch related data
    const [locations, departments, items] = await Promise.all([
      this.prisma.stockLocation.findMany({ where: { id: { in: locationIds } }, select: { id: true, name: true } }),
      this.prisma.department.findMany({ where: { id: { in: departmentIds } }, select: { id: true, name: true } }),
      this.prisma.departmentStockIssueItem.findMany({ where: { departmentStockIssueId: { in: issueIds } } }),
    ]);

    // Fetch inventory items and units for issue items
    const inventoryItemIds = [...new Set(items.map(i => i.inventoryItemId).filter(Boolean))];
    const unitIds = [...new Set(items.map(i => i.unitId).filter(Boolean))];

    const [inventoryItems, units] = await Promise.all([
      inventoryItemIds.length
        ? this.prisma.inventoryItem.findMany({ where: { id: { in: inventoryItemIds } }, select: { id: true, name: true, code: true } })
        : [],
      unitIds.length
        ? this.prisma.unitOfMeasure.findMany({ where: { id: { in: unitIds } }, select: { id: true, name: true, code: true } })
        : [],
    ]);

    // Build lookup maps
    const locationMap = new Map(locations.map(l => [l.id, l]));
    const departmentMap = new Map(departments.map(d => [d.id, d]));
    const inventoryItemMap = new Map(inventoryItems.map(i => [i.id, i]));
    const unitMap = new Map(units.map(u => [u.id, u]));
    const itemsByIssue = new Map<string, any[]>();
    for (const item of items) {
      if (!itemsByIssue.has(item.departmentStockIssueId)) {
        itemsByIssue.set(item.departmentStockIssueId, []);
      }
      itemsByIssue.get(item.departmentStockIssueId)!.push({
        ...item,
        inventoryItem: inventoryItemMap.get(item.inventoryItemId) || null,
        unit: unitMap.get(item.unitId) || null,
      });
    }

    // Enrich each issue
    return issues.map(issue => ({
      ...issue,
      sourceLocation: locationMap.get(issue.sourceLocationId) || null,
      department: departmentMap.get(issue.departmentId) || null,
      items: itemsByIssue.get(issue.id) || [],
    }));
  }

  async findAll(businessId?: string) {
    const issues = await this.prisma.departmentStockIssue.findMany({
      where: businessId ? { businessId } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return this.enrichIssues(issues);
  }

  async findOne(id: string) {
    const issue = await this.prisma.departmentStockIssue.findUnique({ where: { id } });
    if (!issue) return null;
    const enriched = await this.enrichIssues([issue]);
    return enriched[0];
  }

  async updateStatus(id: string, status: string) {
    return this.prisma.departmentStockIssue.update({
      where: { id },
      data: { status, updatedAt: new Date() },
    });
  }
}
