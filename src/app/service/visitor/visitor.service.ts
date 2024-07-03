import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MovieResponse} from "../../dto";
import {Observable} from "rxjs";
import {MovieImageResponse} from "../../dto/movie-image.response";

@Injectable({
  providedIn: 'root'
})
export class VisitorService {
  private movieUri: string = "http://localhost:8080/api/movies";

  constructor(private httpClient: HttpClient) {
  }

  public getMovies(): Observable<MovieResponse[]> {
    return this.httpClient.get<MovieResponse[]>(this.movieUri);
  }

  public getMovieImage(id: number): Observable<MovieImageResponse> {
    return this.httpClient.get<MovieImageResponse>(this.movieUri + "/" + id + "/image")
  }
}
