import { Component, OnInit } from '@angular/core';
import { Appearance, StripeElementsOptions } from '@stripe/stripe-js';
import {
  injectStripe,
  StripeElementsDirective,
  StripePaymentElementComponent,
  StripeService,
  StripeServiceInterface,
} from 'ngx-stripe';
import { environment } from '../../../../environments/environment';
import { TimelineModule } from 'primeng/timeline';
import { ActivatedRoute } from '@angular/router';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { MovieScheduleResponse } from '../../../interface/dto';
import { ImageModule } from 'primeng/image';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LocalStorageService } from '../../../service/local-storage/local-storage.service';
import { InputTextModule } from 'primeng/inputtext';

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
  ],
  templateUrl: './buy-ticket.component.html',
})
export class BuyTicketComponent implements OnInit {
  username = this.localStorageService.getCurrentUsername();

  private movieScheduleId: number = Number(
    this.activatedRoute.snapshot.queryParamMap.get('movie-schedule')
  );

  movieSchedule!: MovieScheduleResponse;

  appearance: Appearance = {
    theme: 'flat',
  };
  elementsOptions: StripeElementsOptions = {
    appearance: this.appearance,
    mode: 'payment',
    locale: 'en',
  };
  stripe: StripeServiceInterface = injectStripe(environment.STRIPE_PUBLIC_KEY);

  constructor(
    private stripeService: StripeService,
    private activatedRoute: ActivatedRoute,
    private visitorService: VisitorService,
    private localStorageService: LocalStorageService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getMovieSchedule(this.movieScheduleId);
    this.createPaymentIntent();
    // todo
    this.elementsOptions.clientSecret = '';
  }

  async getMovieSchedule(id: number): Promise<void> {
    this.visitorService.getMovieSchedule(id).subscribe((v) => {
      this.movieSchedule = v;
    });
  }

  private createPaymentIntent(): void {}
}
