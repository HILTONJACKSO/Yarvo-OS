import { Injectable } from '@nestjs/common';
import { CreateGuestFeedbackDto } from './dto/create-guest-feedback.dto';
import { UpdateGuestFeedbackDto } from './dto/update-guest-feedback.dto';

@Injectable()
export class GuestFeedbackService {
  create(createGuestFeedbackDto: CreateGuestFeedbackDto) {
    return 'This action adds a new guestFeedback';
  }

  findAll(businessId?: string) {
    return `This action returns all guestFeedback`;
  }

  findOne(id: number) {
    return `This action returns a #${id} guestFeedback`;
  }

  update(id: number, updateGuestFeedbackDto: UpdateGuestFeedbackDto) {
    return `This action updates a #${id} guestFeedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} guestFeedback`;
  }
}
