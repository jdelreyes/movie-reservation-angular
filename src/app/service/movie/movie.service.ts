import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MovieImageResponse, MovieResponse } from '../../interface/dto';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private API_MOVIES: string = '/api/movies';
  private movieUri: string = environment.SERVER_URL + this.API_MOVIES;

  constructor(private httpClient: HttpClient) {}

  getAvailableMovies(page: number, size: number): Observable<MovieResponse[]> {
    return this.httpClient.get<MovieResponse[]>(this.movieUri, {
      params: { page: page, size: size },
    });
  }

  getAvailableMoviesByTitleContaining(
    title: string
  ): Observable<MovieResponse[]> {
    return this.httpClient.get<MovieResponse[]>(this.movieUri, {
      params: { title },
    });
  }

  getMovieImage(id: number): Observable<MovieImageResponse> {
    return this.httpClient.get<MovieImageResponse>(
      `${this.movieUri}/${id}/image`
    );
  }

  getMovie(id: number): Observable<MovieResponse> {
    return this.httpClient.get<MovieResponse>(`${this.movieUri}/${id}`);
  }
}
