import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getStats() {
    return {
      ticketsSoldToday: 0,
      guestsInside: 0,
      availableCapacity: 0,
      rejectedScans: 0,
      venueCapacity: [],
      alerts: []
    };
  }
}
