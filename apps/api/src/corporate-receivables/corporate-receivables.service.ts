import { Injectable } from '@nestjs/common';
import { CreateCorporateReceivableDto } from './dto/create-corporate-receivable.dto';
import { UpdateCorporateReceivableDto } from './dto/update-corporate-receivable.dto';

@Injectable()
export class CorporateReceivablesService {
  create(createCorporateReceivableDto: CreateCorporateReceivableDto) {
    return 'This action adds a new corporateReceivable';
  }

  findAll(businessId?: string) {
    return `This action returns all corporateReceivables`;
  }

  findOne(id: number) {
    return `This action returns a #${id} corporateReceivable`;
  }

  update(id: number, updateCorporateReceivableDto: UpdateCorporateReceivableDto) {
    return `This action updates a #${id} corporateReceivable`;
  }

  remove(id: number) {
    return `This action removes a #${id} corporateReceivable`;
  }
}
