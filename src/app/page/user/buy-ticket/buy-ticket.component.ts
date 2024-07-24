import { Component, OnInit } from '@angular/core';
import { StripeElementsOptions } from '@stripe/stripe-js';
import {
  injectStripe,
  StripeElementsDirective,
  StripePaymentElementComponent,
  StripeService,
  StripeServiceInterface,
} from 'ngx-stripe';
import { environment } from '../../../../environments/environment';
import { TimelineModule } from 'primeng/timeline';

@Component({
  selector: 'app-buy-ticket',
  standalone: true,
  imports: [
    StripeElementsDirective,
    StripePaymentElementComponent,
    TimelineModule,
  ],
  templateUrl: './buy-ticket.component.html',
})
export class BuyTicketComponent implements OnInit {
  elementsOptions: StripeElementsOptions = {
    // todo - clientSecret has to be fetched from the backend after creating a payment intent
    clientSecret: '',
    // todo end
    locale: 'en',
  };
  stripe: StripeServiceInterface = injectStripe(environment.STRIPE_PUBLIC_KEY);

  constructor(private stripeService: StripeService) {}

  ngOnInit(): void {
    console.log(this.stripe);
  }
}
