import { Injectable } from '@nestjs/common';
import { CreateHousekeepingReportDto } from './dto/create-housekeeping-report.dto';
import { UpdateHousekeepingReportDto } from './dto/update-housekeeping-report.dto';

@Injectable()
export class HousekeepingReportsService {
  create(createHousekeepingReportDto: CreateHousekeepingReportDto) {
    return 'This action adds a new housekeepingReport';
  }

  findAll(businessId?: string) {
    return `This action returns all housekeepingReports`;
  }

  findOne(id: number) {
    return `This action returns a #${id} housekeepingReport`;
  }

  update(id: number, updateHousekeepingReportDto: UpdateHousekeepingReportDto) {
    return `This action updates a #${id} housekeepingReport`;
  }

  remove(id: number) {
    return `This action removes a #${id} housekeepingReport`;
  }
}
