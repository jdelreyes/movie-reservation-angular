import { TheaterResponse, MovieResponse } from '.';

export interface MovieScheduleResponse {
  id: number;

  startDateTime: string;
  endDateTime: string;

  ticketPurchaseOpeningDateTime: string;
  ticketPurchaseClosingDateTime: string;

  movie: MovieResponse;
  theater: TheaterResponse;
  movieType: string;
  isCancelled: boolean;
}
