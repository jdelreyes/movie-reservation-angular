import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { MovieScheduleResponse } from '../../interface/dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieScheduleService {
  private API_MOVIE_SCHEDULES: string = '/api/movie-schedules';
  private movieScheduleUri: string =
    environment.SERVER_URL + this.API_MOVIE_SCHEDULES;

  constructor(private httpClient: HttpClient) {}

  getMovieSchedules(
    theaterId: number | null,
    movieId: number | null,
    date: string | null = null
  ): Observable<MovieScheduleResponse[]> {
    const params: any = {};
    if (theaterId) params.theater = theaterId;
    if (movieId) params.movie = movieId;
    if (date) params.date = date;

    return this.httpClient.get<MovieScheduleResponse[]>(this.movieScheduleUri, {
      params,
    });
  }

  getMovieSchedule(id: number): Observable<MovieScheduleResponse> {
    return this.httpClient.get<MovieScheduleResponse>(
      `${this.movieScheduleUri}/${id}`
    );
  }
}
