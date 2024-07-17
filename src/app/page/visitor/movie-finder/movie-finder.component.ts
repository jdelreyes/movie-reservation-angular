import { Component, OnInit } from '@angular/core';
import { MovieResponse } from '../../../interface/dto';
import { VisitorService } from '../../../service/visitor/visitor.service';

@Component({
  selector: 'app-movie-finder',
  standalone: true,
  imports: [],
  templateUrl: './movie-finder.component.html',
})
export class MovieFinderComponent implements OnInit {
  public movies: MovieResponse[] = [];

  constructor(private visitorService: VisitorService) {}

  public ngOnInit(): void {}

  public getMovies(title: string): void {
    this.visitorService.getAvailableMoviesByTitleContaining(title).subscribe({
      next: (v) => {
        this.movies = v;
      },
    });
  }
}
