import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get('types')
  findAll() {
    return this.ticketsService.findAll();
  }

  @Post('types')
  createType(@Body() data: any) {
    return this.ticketsService.createType(data);
  }

  @Delete('types/:id')
  deleteType(@Param('id') id: string) {
    return this.ticketsService.deleteType(id);
  }

  @Get('issued')
  getIssuedTickets() {
    return this.ticketsService.getIssuedTickets();
  }

  @Post('issue')
  issueTickets(@Body() data: any) {
    return this.ticketsService.issueTickets(data.tickets);
  }

  @Post('validate')
  validateTicket(@Body('ticketNumber') ticketNumber: string) {
    return this.ticketsService.validateTicket(ticketNumber);
  }
}
