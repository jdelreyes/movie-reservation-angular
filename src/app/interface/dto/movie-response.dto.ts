import { MovieImageResponse } from '.';

export interface MovieResponse {
  id: number;
  title: string;
  description: string;
  directors: string[];
  genres: string[];
  movieImage: MovieImageResponse;
}
