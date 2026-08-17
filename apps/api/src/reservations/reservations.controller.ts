import { Controller, Get, Query, Post, Body, UseGuards, Request, Headers } from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @Get()
  findAll(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.reservationsService.findAll(businessId);
  }

  @Get('arrivals')
  getArrivals(@Request() req: any, @Query('date') date: string) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.reservationsService.getArrivals(businessId, date || new Date().toISOString());
  }

  @Get('departures')
  getDepartures(@Request() req: any, @Query('date') date: string) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.reservationsService.getDepartures(businessId, date || new Date().toISOString());
  }

  @Get('stats')
  getStats(@Request() req: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.reservationsService.getDashboardStats(businessId);
  }

  @Post()
  create(@Request() req: any, @Body() createReservationDto: any) {
    const businessId = req.headers['x-business-id'] || req.user.businessId;
    return this.reservationsService.create(businessId, createReservationDto);
  }
}
