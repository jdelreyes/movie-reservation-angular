import { MovieImageResponse } from './movie-image.response';

export interface MovieResponse {
  id: number;
  title: string;
  description: string;
  director: string;
  genre: string;
  movieImage: MovieImageResponse;
}
