import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MovieResponse,
  MovieScheduleResponse,
  MovieImageResponse,
} from '../../dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VisitorService {
  private movieUri: string = 'http://localhost:8080/api/movies';
  private movieScheduleUri: string = 'http://localhost:8080/movie-schedules';

  constructor(private httpClient: HttpClient) {}

  public getMovie(id: number): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(this.movieUri + '/' + id);
  }

  public getAvailableMovies(): Observable<MovieResponse[]> {
    return this.httpClient.get<MovieResponse[]>(this.movieUri);
  }

  public getMovieImage(id: number): Observable<MovieImageResponse> {
    return this.httpClient.get<MovieImageResponse>(
      this.movieUri + '/' + id + '/image'
    );
  }

  public getMovieSchedules(): Observable<MovieScheduleResponse[]> {
    return this.httpClient.get<MovieScheduleResponse[]>(this.movieScheduleUri);
  }

  public getMovieSchedule(id: number): Observable<MovieScheduleResponse> {
    return this.httpClient.get<MovieScheduleResponse>(
      this.movieScheduleUri + '/' + id
    );
  }
}
