import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MovieResponse } from '../../../interface/dto';
import { ImageModule } from 'primeng/image';
import { TitleCasePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { UnderscoreToSpacePipe } from '../../../pipe/underscore-space.pipe';
import { MovieService } from '../../../service/movie/movie.service';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [
    ImageModule,
    TitleCasePipe,
    TagModule,
    ButtonModule,
    UnderscoreToSpacePipe,
    RouterLink,
  ],
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent implements OnInit {
  private id: number = Number(this.activatedRoute.snapshot.paramMap.get('id'));

  movie!: MovieResponse;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    this.movieService.getMovie(this.id).subscribe({
      next: (movie: MovieResponse) => {
        this.movie = movie;
      },
      error: (e) => {
        const NOT_FOUND_STATUS_CODE: number = 404;

        if (e.status == NOT_FOUND_STATUS_CODE)
          this.router.navigate(['/not-found']);
      },
    });
  }
}
