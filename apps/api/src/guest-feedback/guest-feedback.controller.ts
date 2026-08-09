import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GuestFeedbackService } from './guest-feedback.service';
import { CreateGuestFeedbackDto } from './dto/create-guest-feedback.dto';
import { UpdateGuestFeedbackDto } from './dto/update-guest-feedback.dto';

@Controller('guest-feedback')
export class GuestFeedbackController {
  constructor(private readonly guestFeedbackService: GuestFeedbackService) {}

  @Post()
  create(@Body() createGuestFeedbackDto: CreateGuestFeedbackDto) {
    return this.guestFeedbackService.create(createGuestFeedbackDto);
  }

  @Get()
  findAll() {
    return this.guestFeedbackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.guestFeedbackService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuestFeedbackDto: UpdateGuestFeedbackDto) {
    return this.guestFeedbackService.update(+id, updateGuestFeedbackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guestFeedbackService.remove(+id);
  }
}
