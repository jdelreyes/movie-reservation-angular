import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { MovieResponse } from '../../../dto';
import { Base64Pipe } from '../../../pipe/base64.pipe';
import { LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';
import { PageEvent } from '../../event';
import e from 'express';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    Base64Pipe,
    LowerCasePipe,
    RouterLink,
    CardModule,
    ImageModule,
    SkeletonModule,
    PaginatorModule,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public title: string = 'Movies';
  public movieList: MovieResponse[] = [];
  public first: number = 0;
  public page: number = 0;
  public rows: number = 2;

  constructor(private visitorService: VisitorService) {}

  public ngOnInit(): void {
    this.getAvailableMovies();
  }

  public onPageChange(event: PageEvent) {
    this.page = event.page;
    this.rows = event.rows;
    console.log(this.page);
    console.log(this.rows);
    this.getAvailableMovies();
  }

  private getAvailableMovies(): void {
    this.visitorService
      .getAvailableMovies(this.page, this.rows)
      .subscribe((movies: MovieResponse[]): void => {
        this.movieList = movies;
      });
  }
}
