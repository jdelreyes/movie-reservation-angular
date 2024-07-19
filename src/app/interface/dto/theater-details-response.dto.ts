import { SeatResponseDto } from './seat-response.dto';

export interface TheaterDetailsResponse {
  id: number;
  name: string;
  location: string;
  seatResponseList: SeatResponseDto[];
}
