import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BranchServicesService } from './branch-services.service';
import { BranchServicesController } from './branch-services.controller';
import { PropertyAreasService } from './property-areas.service';
import { PropertyAreasController } from './property-areas.controller';
import { RoomTypesService } from './room-types.service';
import { RoomTypesController } from './room-types.controller';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { SeatingAreasService } from './seating-areas.service';
import { SeatingAreasController } from './seating-areas.controller';
import { TablesService } from './tables.service';
import { TablesController } from './tables.controller';
import { ServicePointsService } from './service-points.service';
import { ServicePointsController } from './service-points.controller';
import { BeachResourcesService } from './beach-resources.service';
import { BeachResourcesController } from './beach-resources.controller';
import { PoolsService } from './pools.service';
import { PoolsController } from './pools.controller';
import { EventSpacesService } from './event-spaces.service';
import { EventSpacesController } from './event-spaces.controller';
import { OperatingHoursService } from './operating-hours.service';
import { OperatingHoursController } from './operating-hours.controller';

@Module({
  controllers: [BranchServicesController, PropertyAreasController, RoomTypesController, RoomsController, SeatingAreasController, TablesController, ServicePointsController, BeachResourcesController, PoolsController, EventSpacesController, OperatingHoursController],
  providers: [BranchServicesService, PropertyAreasService, RoomTypesService, RoomsService, SeatingAreasService, TablesService, ServicePointsService, BeachResourcesService, PoolsService, EventSpacesService, OperatingHoursService, PrismaService],
})
export class PropertyModule {}
