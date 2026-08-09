import { PartialType } from '@nestjs/mapped-types';
import { CreateCheckoutReviewDto } from './create-checkout-review.dto';

export class UpdateCheckoutReviewDto extends PartialType(CreateCheckoutReviewDto) {}
