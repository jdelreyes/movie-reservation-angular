import {
  Component,
  OnInit,
  ViewChild,
  ɵsetCurrentInjector,
} from '@angular/core';
import { Appearance, StripeElementsOptions } from '@stripe/stripe-js';
import {
  injectStripe,
  StripeElementsDirective,
  StripePaymentElementComponent,
  StripeServiceInterface,
} from 'ngx-stripe';
import { environment } from '../../../../environments/environment';
import { TimelineModule } from 'primeng/timeline';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  ConfigResponse,
  CreateTicketPaymentIntentRequest,
  MovieScheduleResponse,
  PaymentIntentResponse,
} from '../../../interface/dto';
import { ImageModule } from 'primeng/image';
import { ReactiveFormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-buy-ticket',
  standalone: true,
  imports: [
    StripeElementsDirective,
    StripePaymentElementComponent,
    TimelineModule,
    ImageModule,
    ReactiveFormsModule,
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
  ],
  templateUrl: './buy-ticket.component.html',
})
export class BuyTicketComponent implements OnInit {
  @ViewChild(StripeElementsDirective)
  stripeElementDirective!: StripeElementsDirective;

  private movieScheduleId: number;
  username: string | null = '';
  movieSchedule!: MovieScheduleResponse;
  createTicketPaymentIntentRequest!: CreateTicketPaymentIntentRequest;
  appearance: Appearance = {
    theme: 'night',
  };
  elementsOptions!: StripeElementsOptions;
  stripe: StripeServiceInterface = injectStripe(environment.STRIPE_PUBLIC_KEY);
  amount!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieScheduleService: MovieScheduleService,
    private localStorageService: LocalStorageService,
    private stripeService: StripeService
  ) {
    this.movieScheduleId = Number(
      this.activatedRoute.snapshot.queryParamMap.get('movie-schedule')
    );
    this.username = this.localStorageService.getCurrentUsername();
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
        this.createTicketPaymentIntentRequest = {
          movieType: movieSchedule.movieType,
        };
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

  private async initializeStripe() {
    await this.stripeService.getConfig().forEach((config: ConfigResponse) => {
      this.stripe = injectStripe(config.publishableKey);
    });
  }
}
