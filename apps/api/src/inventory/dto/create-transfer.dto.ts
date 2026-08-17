export class CreateTransferItemDto {
  inventoryItemId: string;
  requestedQuantity: number;
  unitId: string;
}

export class CreateTransferDto {
  sourceLocationId: string;
  destinationLocationId: string;
  requestedByUserId?: string;
  expectedDate?: string;
  notes?: string;
  items: CreateTransferItemDto[];
  status?: string; // 'DRAFT' or 'PENDING'
}
