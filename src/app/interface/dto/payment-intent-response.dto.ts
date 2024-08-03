import { SeatResponse } from "./seat-response.dto";

export interface PaymentIntentResponse {
  clientSecret: string;
  amount: number;
  seat: SeatResponse
}
