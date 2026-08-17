import { Injectable } from '@nestjs/common';
import { CreatePurchasingReportDto } from './dto/create-purchasing-report.dto';
import { UpdatePurchasingReportDto } from './dto/update-purchasing-report.dto';

@Injectable()
export class PurchasingReportsService {
  create(createPurchasingReportDto: CreatePurchasingReportDto) {
    return 'This action adds a new purchasingReport';
  }

  findAll(businessId?: string) {
    return `This action returns all purchasingReports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} purchasingReport`;
  }

  update(id: number, updatePurchasingReportDto: UpdatePurchasingReportDto) {
    return `This action updates a #${id} purchasingReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} purchasingReport`;
  }
}
