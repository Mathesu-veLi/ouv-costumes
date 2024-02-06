import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import Stripe from 'stripe';

@Injectable()
export class CheckoutsService {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  private stripe = new Stripe(process.env.STRAPI_KEY);
  async create(createCheckoutDto: CreateCheckoutDto) {
    const session = await this.stripe.checkout.sessions.create({
      line_items: createCheckoutDto.lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}?success=true`,
      cancel_url: `${process.env.CLIENT_URL}?canceled=true`,
    });

    return session.url;
  }
}
