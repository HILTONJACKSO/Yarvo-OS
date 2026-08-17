export class CreateIssueItemDto {
  inventoryItemId: string;
  requestedQuantity: number;
  unitId: string;
}

export class CreateIssueDto {
  sourceLocationId: string;
  departmentId: string;
  requestedByUserId?: string;
  purpose?: string;
  items: CreateIssueItemDto[];
  status?: string; // 'DRAFT', 'PENDING', or 'ISSUED'
}
