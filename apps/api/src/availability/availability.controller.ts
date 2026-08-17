import { Controller, Get, Query, Headers } from '@nestjs/common';
import { AvailabilityService } from './availability.service';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get('search')
  searchRooms(
    @Query('arrivalDate') arrivalDate: string,
    @Query('departureDate') departureDate: string,
    @Query('numberOfRooms') numberOfRooms: number,
    @Query('adults') adults: number,
    @Query('children') children: number,
  ) {
    return this.availabilityService.checkAvailability({
      arrivalDate,
      departureDate,
      numberOfRooms: Number(numberOfRooms),
      adults: Number(adults),
      children: Number(children)
    });
  }
}
