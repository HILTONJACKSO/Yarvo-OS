import { Module } from '@nestjs/common';
import { CustomersModule } from './customers/customers.module';
import { PreferencesModule } from './preferences/preferences.module';
import { TimelineModule } from './timeline/timeline.module';
import { CommunicationsModule } from './communications/communications.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ComplaintsModule } from './complaints/complaints.module';
import { CorporateModule } from './corporate/corporate.module';
import { VipModule } from './vip/vip.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [CustomersModule, PreferencesModule, TimelineModule, CommunicationsModule, FeedbackModule, ComplaintsModule, CorporateModule, VipModule, AnalyticsModule]
})
export class CrmModule {}
