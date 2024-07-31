import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TheaterDetailsResponse, TheaterResponse } from '../../interface/dto';

@Injectable({
  providedIn: 'root',
})
export class TheaterService {
  private API_THEATERS: string = '/api/theaters';
  private theaterUri: string = environment.SERVER_URL + this.API_THEATERS;

  constructor(private httpClient: HttpClient) {}

  getTheatersByNameContaining(name: string) {
    return this.httpClient.get<TheaterResponse[]>(
      `${this.theaterUri}?name=${name}`
    );
  }

  getTheater(id: number) {
    return this.httpClient.get<TheaterDetailsResponse>(
      `${this.theaterUri}/${id}`
    );
  }
}
