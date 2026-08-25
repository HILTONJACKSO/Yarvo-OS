export class CreatePurchaseOrderItemDto {
  inventoryItemId: string;
  orderedQuantity: number;
  unitCost: number;
  taxAmount: number;
  lineTotal: number;
  unitId?: string;
}

export class CreatePurchaseOrderDto {
  supplierId: string;
  expectedDeliveryDate: string;
  deliveryLocationId?: string;
  paymentTerms?: string;
  currency: string;
  subtotal: number;
  taxAmount: number;
  totalAmount: number;
  status: string;
  items: CreatePurchaseOrderItemDto[];
}
