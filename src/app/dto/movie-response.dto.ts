import { MovieImageResponse } from './movie-image.response';

export interface MovieResponse {
  id: number;
  title: string;
  description: string;
  directors: string[];
  genres: string[];
  movieImage: MovieImageResponse;
}
