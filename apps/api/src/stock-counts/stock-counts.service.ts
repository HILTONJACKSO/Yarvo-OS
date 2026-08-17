import { Injectable } from '@nestjs/common';
import { CreateStockCountDto } from './dto/create-stock-count.dto';
import { UpdateStockCountDto } from './dto/update-stock-count.dto';

@Injectable()
export class StockCountsService {
  create(createStockCountDto: CreateStockCountDto) {
    return 'This action adds a new stockCount';
  }

  findAll(businessId?: string) {
    return `This action returns all stockCounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockCount`;
  }

  update(id: number, updateStockCountDto: UpdateStockCountDto) {
    return `This action updates a #${id} stockCount`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockCount`;
  }
}
