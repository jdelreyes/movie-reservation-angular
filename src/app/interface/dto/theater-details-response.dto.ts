import { SeatResponse } from './seat-response.dto';

export interface TheaterDetailsResponse {
  id: number;
  name: string;
  location: string;
  seatResponseList: SeatResponse[];
}
