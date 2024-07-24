import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MovieResponse,
  MovieScheduleResponse,
  MovieImageResponse,
  TheaterResponse,
  TheaterDetailsResponse,
} from '../../interface/dto';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  private movieUri: string = environment.SERVER_URL + '/api/movies';
  private movieScheduleUri: string =
    environment.SERVER_URL + '/api/movie-schedules';
  private theaterUri: string = environment.SERVER_URL + '/api/theaters';

  constructor(private httpClient: HttpClient) {}

  getMovie(id: number): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(this.movieUri + '/' + id);
  }

  getAvailableMovies(page: number, size: number): Observable<MovieResponse[]> {
    return this.httpClient.get<MovieResponse[]>(`${this.movieUri}`, {
      params: { page: page, size: size },
    });
  }

  getAvailableMoviesByTitleContaining(title: string) {
    return this.httpClient.get<MovieResponse[]>(`${this.movieUri}`, {
      params: { title: title },
    });
  }

  getMovieImage(id: number): Observable<MovieImageResponse> {
    return this.httpClient.get<MovieImageResponse>(
      this.movieUri + '/' + id + '/image'
    );
  }

  getMovieSchedules(
    theaterId: number | null,
    movieId: number | null,
    date: string | null = null
  ) {
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
      this.movieScheduleUri + '/' + id
    );
  }

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
