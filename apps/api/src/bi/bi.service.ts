import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class BiService {
  constructor(private prisma: PrismaService) {}

  async getExecutiveDashboard() {
    // Total YTD Revenue (sum of Invoice where type === 'RECEIVABLE')
    const revLedgers = await this.prisma.invoice.findMany({
      where: { type: 'RECEIVABLE' }
    });
    const totalYtdRevenue = revLedgers.reduce((sum: number, entry: any) => sum + entry.totalAmount, 0);

    // Revenue by Department
    const deptMap: Record<string, number> = {};
    for (const entry of revLedgers) {
      const dept = 'General'; // Invoice doesn't have department natively, fallback to General
      deptMap[dept] = (deptMap[dept] || 0) + entry.totalAmount;
    }
    const departmentRevenue = Object.entries(deptMap).map(([name, value]) => ({
      name,
      value: `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      percentage: totalYtdRevenue > 0 ? `${Math.round((value / totalYtdRevenue) * 100)}%` : '0%'
    }));

    // KPIs
    const customersCount = await this.prisma.customer.count();
    const invoicesCount = await this.prisma.supplierInvoice.count();
    const complaintsCount = await this.prisma.customerComplaint.count({ where: { status: 'OPEN' } });
    
    const kpis = [
      { title: 'Total Revenue', value: `$${totalYtdRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, trend: '+0.0%', trendUp: true },
      { title: 'Active Customers', value: customersCount.toString(), trend: '+0.0%', trendUp: true },
      { title: 'Invoices Tracked', value: invoicesCount.toString(), trend: '+0.0%', trendUp: true },
      { title: 'Open Complaints', value: complaintsCount.toString(), trend: '-0.0%', trendUp: true }
    ];

    // Action Items
    const actionItems = [];
    if (complaintsCount > 0) {
      actionItems.push(`There are ${complaintsCount} open customer complaints requiring attention.`);
    }
    const overdueInvoices = await this.prisma.supplierInvoice.count({ where: { status: 'OVERDUE' } });
    if (overdueInvoices > 0) {
      actionItems.push(`There are ${overdueInvoices} overdue invoices.`);
    }

    // AI Insights
    let insights = 'No AI insights generated yet. The system needs more operational data to provide recommendations.';
    if (totalYtdRevenue > 0) {
      insights = `Based on your recent financial data, the leading department is ${departmentRevenue.sort((a,b) => parseFloat(b.percentage) - parseFloat(a.percentage))[0]?.name || 'Unknown'}, contributing significantly to the $${totalYtdRevenue.toLocaleString()} YTD revenue. Focus on resolving the ${complaintsCount} open complaints to improve customer retention.`;
    }

    return {
      totalYtdRevenue: `$${totalYtdRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      kpis,
      departmentRevenue,
      actionItems,
      insights
    };
  }
}
