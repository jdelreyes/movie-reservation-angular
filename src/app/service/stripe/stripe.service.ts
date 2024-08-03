import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ConfigResponse,
  CreateTicketPaymentIntentRequest,
  PaymentIntentResponse,
} from '../../interface/dto';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class StripeService {
  private stripeUri: string = environment.SERVER_URL + '/api/stripe';

  constructor(private httpClient: HttpClient) {}

  createTicketPaymentIntent(
    createTicketPaymentIntentRequest: CreateTicketPaymentIntentRequest
  ): Observable<PaymentIntentResponse> {
    return this.httpClient.post<PaymentIntentResponse>(
      this.stripeUri + '/create-payment-intent',
      createTicketPaymentIntentRequest,
      { withCredentials: true }
    );
  }

  getConfig(): Observable<ConfigResponse> {
    return this.httpClient.get<ConfigResponse>(this.stripeUri + '/config', {
      withCredentials: true,
    });
  }
}
