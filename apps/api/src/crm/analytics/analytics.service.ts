import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getOverview() {
    const totalCustomers = await this.prisma.customer.count();
    const vipCount = await this.prisma.customer.count({ where: { isVip: true } });
    const complaintsCount = await this.prisma.customerComplaint.count({ where: { status: 'OPEN' } });
    
    return {
      kpis: [
        { title: 'Total Customers', value: totalCustomers.toString(), trend: '+5.2%', trendUp: true },
        { title: 'VIP Guests', value: vipCount.toString(), trend: '+2.1%', trendUp: true },
        { title: 'Open Complaints', value: complaintsCount.toString(), trend: '-1.5%', trendUp: false },
        { title: 'Customer Satisfaction', value: '4.8/5', trend: '+0.2', trendUp: true }
      ],
      topCustomer: {
        name: 'Alex Johnson',
        initials: 'AJ',
        type: 'VIP Corporate',
        ltv: '$12,450',
        visits: 14
      },
      alerts: [
        { title: 'VIP Arrival', desc: 'Mr. Smith arriving at 14:00 today. Room upgrade requested.' },
        { title: 'Unresolved Complaint', desc: 'Complaint #1042 open for >48 hours in Housekeeping.' }
      ]
    };
  }
}
