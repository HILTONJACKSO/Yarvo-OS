import { Module } from '@nestjs/common';
import { CustomersController } from './customers.controller';
import { CustomersService } from './customers.service';
import { CustomerLabelsController } from './customer-labels.controller';
import { CustomerLabelsService } from './customer-labels.service';
import { CustomerNotesController } from './customer-notes.controller';
import { CustomerNotesService } from './customer-notes.service';
import { CustomerIdentificationsController } from './customer-identifications.controller';
import { CustomerIdentificationsService } from './customer-identifications.service';
import { CustomerGroupsController } from './customer-groups.controller';
import { CustomerGroupsService } from './customer-groups.service';
import { CorporateAccountsController } from './corporate-accounts.controller';
import { CorporateAccountsService } from './corporate-accounts.service';

@Module({
  controllers: [CustomersController, CustomerLabelsController, CustomerNotesController, CustomerIdentificationsController, CustomerGroupsController, CorporateAccountsController],
  providers: [CustomersService, CustomerLabelsService, CustomerNotesService, CustomerIdentificationsService, CustomerGroupsService, CorporateAccountsService],
})
export class CustomersModule {}
