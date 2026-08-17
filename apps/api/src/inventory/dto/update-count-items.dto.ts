export class UpdateCountItemDto {
  itemId: string;
  countedQuantity: number;
}

export class UpdateCountItemsDto {
  items: UpdateCountItemDto[];
}
