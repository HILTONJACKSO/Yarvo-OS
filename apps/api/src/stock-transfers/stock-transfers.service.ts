import { Injectable } from '@nestjs/common';
import { CreateStockTransferDto } from './dto/create-stock-transfer.dto';
import { UpdateStockTransferDto } from './dto/update-stock-transfer.dto';

@Injectable()
export class StockTransfersService {
  create(createStockTransferDto: CreateStockTransferDto) {
    return 'This action adds a new stockTransfer';
  }

  findAll(businessId?: string) {
    return `This action returns all stockTransfers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockTransfer`;
  }

  update(id: number, updateStockTransferDto: UpdateStockTransferDto) {
    return `This action updates a #${id} stockTransfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockTransfer`;
  }
}
