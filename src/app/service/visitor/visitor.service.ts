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

@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  private movieUri: string = 'http://localhost:8080/api/movies';
  private movieScheduleUri: string =
    'http://localhost:8080/api/movie-schedules';
  private theaterUri: string = 'http://localhost:8080/api/theaters';

  constructor(private httpClient: HttpClient) {}

  public getMovie(id: number): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(this.movieUri + '/' + id);
  }

  public getAvailableMovies(
    page: number,
    size: number
  ): Observable<MovieResponse[]> {
    return this.httpClient.get<MovieResponse[]>(`${this.movieUri}`, {
      params: { page: page, size: size },
    });
  }

  public getAvailableMoviesByTitleContaining(title: string) {
    return this.httpClient.get<MovieResponse[]>(`${this.movieUri}`, {
      params: { title: title },
    });
  }

  public getMovieImage(id: number): Observable<MovieImageResponse> {
    return this.httpClient.get<MovieImageResponse>(
      this.movieUri + '/' + id + '/image'
    );
  }

  public getMovieSchedules(theaterId: number | null, movieId: number | null) {
    if (theaterId && movieId)
      return this.httpClient.get<MovieScheduleResponse[]>(
        this.movieScheduleUri,
        {
          params: { theater: theaterId, movie: movieId },
        }
      );

    if (theaterId)
      return this.httpClient.get<MovieScheduleResponse[]>(
        this.movieScheduleUri,
        {
          params: { theater: theaterId },
        }
      );

    if (movieId)
      return this.httpClient.get<MovieScheduleResponse[]>(
        this.movieScheduleUri,
        {
          params: { movie: movieId },
        }
      );

    return this.httpClient.get<MovieScheduleResponse[]>(this.movieScheduleUri);
  }

  public getMovieSchedule(id: number): Observable<MovieScheduleResponse> {
    return this.httpClient.get<MovieScheduleResponse>(
      this.movieScheduleUri + '/' + id
    );
  }

  public getTheatersByNameContaining(name: string) {
    return this.httpClient.get<TheaterResponse[]>(
      `${this.theaterUri}?name=${name}`
    );
  }

  public getTheater(id: number) {
    return this.httpClient.get<TheaterDetailsResponse>(
      `${this.theaterUri}/${id}`
    );
  }
}
