import { Injectable } from '@nestjs/common';
import { CreateCheckoutReviewDto } from './dto/create-checkout-review.dto';
import { UpdateCheckoutReviewDto } from './dto/update-checkout-review.dto';

@Injectable()
export class CheckoutReviewService {
  create(createCheckoutReviewDto: CreateCheckoutReviewDto) {
    return 'This action adds a new checkoutReview';
  }

  findAll(businessId?: string) {
    return `This action returns all checkoutReview`;
  }

  findOne(id: number) {
    return `This action returns a #${id} checkoutReview`;
  }

  update(id: number, updateCheckoutReviewDto: UpdateCheckoutReviewDto) {
    return `This action updates a #${id} checkoutReview`;
  }

  remove(id: number) {
    return `This action removes a #${id} checkoutReview`;
  }
}
