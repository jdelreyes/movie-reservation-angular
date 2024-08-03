import { Component, OnInit, signal, ViewChild } from '@angular/core';
import {
  Appearance,
  PaymentIntentResult,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import {
  injectStripe,
  StripeElementsDirective,
  StripePaymentElementComponent,
  StripeServiceInterface,
} from 'ngx-stripe';
import { environment } from '../../../../environments/environment';
import { TimelineModule } from 'primeng/timeline';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  ConfigResponse,
  CreateTicketPaymentIntentRequest,
  MovieScheduleResponse,
  PaymentIntentRequest,
  PaymentIntentResponse,
  SeatResponse,
} from '../../../interface/dto';
import { ImageModule } from 'primeng/image';
import { LocalStorageService } from '../../../service/local-storage/local-storage.service';
import { InputTextModule } from 'primeng/inputtext';
import { StripeService } from '../../../service/stripe/stripe.service';
import { DividerModule } from 'primeng/divider';
import {
  IsoStringToDateObjectPipe,
  UnderscoreToSpacePipe,
} from '../../../pipe';
import { CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { MovieScheduleService } from '../../../service/movie-schedule/movie-schedule.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCouch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-buy-ticket',
  standalone: true,
  imports: [
    StripeElementsDirective,
    StripePaymentElementComponent,
    TimelineModule,
    ImageModule,
    InputTextModule,
    DividerModule,
    IsoStringToDateObjectPipe,
    DatePipe,
    TagModule,
    ButtonModule,
    RouterLink,
    UnderscoreToSpacePipe,
    TitleCasePipe,
    CurrencyPipe,
    FontAwesomeModule,
  ],
  templateUrl: './buy-ticket.component.html',
})
export class BuyTicketComponent implements OnInit {
  private movieScheduleId: number;
  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;
  username: string | null = '';
  movieSchedule!: MovieScheduleResponse;
  createTicketPaymentIntentRequest!: CreateTicketPaymentIntentRequest;
  appearance: Appearance = {
    theme: 'night',
  };
  elementsOptions!: StripeElementsOptions;
  stripe: StripeServiceInterface = injectStripe(environment.STRIPE_PUBLIC_KEY);
  amount!: number;
  paying = signal(false);
  faCouch = faCouch;
  seat!: SeatResponse;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieScheduleService: MovieScheduleService,
    private localStorageService: LocalStorageService,
    private stripeService: StripeService,
    private router: Router
  ) {
    this.movieScheduleId = Number(
      this.activatedRoute.snapshot.queryParamMap.get('movie-schedule')
    );
    this.username = this.localStorageService.getCurrentUsername();
  }

  pay() {
    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        confirmParams: {
          payment_method_data: {
            billing_details: { name: this.username },
          },
        },
        redirect: 'if_required',
      })
      // todo: need more logic
      .subscribe((paymentIntentResult: PaymentIntentResult) => {
        console.log(paymentIntentResult);

        if (paymentIntentResult.error) {
          console.error(paymentIntentResult.error.message);
        } else {
          if (paymentIntentResult.paymentIntent.status === 'succeeded') {
            const paymentIntentRequest: PaymentIntentRequest = {
              id: paymentIntentResult.paymentIntent.id,
              amount: paymentIntentResult.paymentIntent.amount,
              currency: paymentIntentResult.paymentIntent.currency,
              status: paymentIntentResult.paymentIntent.status,
            };

            // todo: put some id before '/receipt'. `/receipt/:id`
            this.router.navigate([`/receipt/${paymentIntentRequest.id}`]);
          }
        }
      });
  }

  async ngOnInit() {
    await this.loadMovieSchedule();
    await this.createTicketPaymentIntent();
  }

  private async loadMovieSchedule() {
    await this.movieScheduleService
      .getMovieSchedule(this.movieScheduleId)
      .forEach((movieSchedule: MovieScheduleResponse) => {
        this.movieSchedule = movieSchedule;
        // todo
        this.createTicketPaymentIntentRequest = {
          movieType: movieSchedule.movieType,
          seatId: 1,
        };
        this.seat = { id: 1, seatNumber: 1, rowLetter: 'A', isReserved: false };
      });
  }

  private async createTicketPaymentIntent() {
    await this.stripeService
      .createTicketPaymentIntent(this.createTicketPaymentIntentRequest)
      .forEach((paymentIntent: PaymentIntentResponse) => {
        this.amount = paymentIntent.amount;

        this.elementsOptions = {
          clientSecret: paymentIntent.clientSecret,
          locale: 'en-CA',
          appearance: this.appearance,
        };
      });
  }

  // to dynamically fetch stripe publishable key from the server
  private async initializeStripe() {
    await this.stripeService.getConfig().forEach((config: ConfigResponse) => {
      this.stripe = injectStripe(config.publishableKey);
    });
  }
}
