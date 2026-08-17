import { Injectable } from '@nestjs/common';
import { CreateStockBalanceDto } from './dto/create-stock-balance.dto';
import { UpdateStockBalanceDto } from './dto/update-stock-balance.dto';

@Injectable()
export class StockBalancesService {
  create(createStockBalanceDto: CreateStockBalanceDto) {
    return 'This action adds a new stockBalance';
  }

  findAll(businessId?: string) {
    return `This action returns all stockBalances`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stockBalance`;
  }

  update(id: number, updateStockBalanceDto: UpdateStockBalanceDto) {
    return `This action updates a #${id} stockBalance`;
  }

  remove(id: number) {
    return `This action removes a #${id} stockBalance`;
  }
}
