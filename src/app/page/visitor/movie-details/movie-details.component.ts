import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieResponse } from '../../../interface/dto';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { ImageModule } from 'primeng/image';
import { TitleCasePipe } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { SpacePipe } from '../../../pipe/space.pipe';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [ImageModule, TitleCasePipe, TagModule, ButtonModule, SpacePipe],
  templateUrl: './movie-details.component.html',
})
export class MovieDetailsComponent implements OnInit {
  private id: number = Number(this.activatedRouter.snapshot.paramMap.get('id'));

  public movie: MovieResponse | null = null;

  public constructor(
    private visitorService: VisitorService,
    private activatedRouter: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.visitorService.getMovie(this.id).subscribe((movie) => {
      this.movie = movie;
    });
  }
}
