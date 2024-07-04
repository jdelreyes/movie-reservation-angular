import { TheaterResponse, MovieResponse } from '.';

export interface MovieScheduleResponse {
  id: number;
  startDateTime: Date;
  endDateTime: Date;
  ticketPurchaseOpeningDateTime: Date;
  ticketPurchaseClosingDateTime: Date;
  movieResponse: MovieResponse;
  theater: TheaterResponse;
  movieType: string;
  isCancelled: boolean;
}
