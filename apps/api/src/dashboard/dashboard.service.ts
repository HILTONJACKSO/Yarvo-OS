import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  getOverview() {
    // Return empty datasets for now as requested for the fresh system
    return {
      revenueData: [],
      stats: []
    };
  }
}
