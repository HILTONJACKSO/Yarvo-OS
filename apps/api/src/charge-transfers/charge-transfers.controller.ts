import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChargeTransfersService } from './charge-transfers.service';
import { CreateChargeTransferDto } from './dto/create-charge-transfer.dto';
import { UpdateChargeTransferDto } from './dto/update-charge-transfer.dto';

@Controller('charge-transfers')
export class ChargeTransfersController {
  constructor(private readonly chargeTransfersService: ChargeTransfersService) {}

  @Post()
  create(@Body() createChargeTransferDto: CreateChargeTransferDto) {
    return this.chargeTransfersService.create(createChargeTransferDto);
  }

  @Get()
  findAll() {
    return this.chargeTransfersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chargeTransfersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChargeTransferDto: UpdateChargeTransferDto) {
    return this.chargeTransfersService.update(+id, updateChargeTransferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chargeTransfersService.remove(+id);
  }
}
