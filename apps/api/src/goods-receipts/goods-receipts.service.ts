import { Injectable } from '@nestjs/common';
import { CreateGoodsReceiptDto } from './dto/create-goods-receipt.dto';
import { UpdateGoodsReceiptDto } from './dto/update-goods-receipt.dto';

@Injectable()
export class GoodsReceiptsService {
  create(createGoodsReceiptDto: CreateGoodsReceiptDto) {
    return 'This action adds a new goodsReceipt';
  }

  findAll(businessId?: string) {
    return `This action returns all goodsReceipts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} goodsReceipt`;
  }

  update(id: number, updateGoodsReceiptDto: UpdateGoodsReceiptDto) {
    return `This action updates a #${id} goodsReceipt`;
  }

  remove(id: number) {
    return `This action removes a #${id} goodsReceipt`;
  }
}
