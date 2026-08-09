import { PartialType } from '@nestjs/mapped-types';
import { CreateGuestFeedbackDto } from './create-guest-feedback.dto';

export class UpdateGuestFeedbackDto extends PartialType(CreateGuestFeedbackDto) {}
