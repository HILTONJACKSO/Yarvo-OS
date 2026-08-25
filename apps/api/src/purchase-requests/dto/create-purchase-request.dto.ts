export class CreatePurchaseRequestItemDto {
  inventoryItemId: string;
  requestedQuantity: number;
  unitId?: string;
  estimatedUnitCost?: number;
}

export class CreatePurchaseRequestDto {
  departmentId?: string;
  requiredDate?: string;
  priority: string;
  notes?: string;
  status: string;
  items: CreatePurchaseRequestItemDto[];
}
