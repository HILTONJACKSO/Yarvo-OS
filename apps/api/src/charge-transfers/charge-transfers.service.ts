import { Injectable } from '@nestjs/common';
import { CreateChargeTransferDto } from './dto/create-charge-transfer.dto';
import { UpdateChargeTransferDto } from './dto/update-charge-transfer.dto';

@Injectable()
export class ChargeTransfersService {
  create(createChargeTransferDto: CreateChargeTransferDto) {
    return 'This action adds a new chargeTransfer';
  }

  findAll() {
    return `This action returns all chargeTransfers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chargeTransfer`;
  }

  update(id: number, updateChargeTransferDto: UpdateChargeTransferDto) {
    return `This action updates a #${id} chargeTransfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} chargeTransfer`;
  }
}
