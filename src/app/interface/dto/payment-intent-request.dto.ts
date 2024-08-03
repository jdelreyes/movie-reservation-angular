export interface PaymentIntentRequest {
  id: string;
  amount: number;
  currency: string;
  status: string;
}
