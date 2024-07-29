import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieResponse } from '../../../interface/dto';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { ImageModule } from 'primeng/image';
import { TitleCasePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { UnderscoreToSpacePipe } from '../../../pipe/underscore-space.pipe';

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
    private visitorService: VisitorService,
    private activatedRoute: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getMovie();
  }

  async getMovie(): Promise<void> {
    this.visitorService.getMovie(this.id).subscribe({
      next: (movie) => {
        this.movie = movie;
      },
    });
  }
}
