import { Component, OnInit } from '@angular/core';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { MovieResponse } from '../../../dto';
import { Base64Pipe } from '../../../pipe/base64.pipe';
import { LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Base64Pipe, LowerCasePipe, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  public title: string = 'Available Movies';
  public movieList: MovieResponse[] = [];

  constructor(private visitorService: VisitorService) {}

  public ngOnInit(): void {
    this.getMovies();
  }

  private getMovies(): void {
    this.visitorService
      .getAvailableMovies()
      .subscribe((movies: MovieResponse[]): void => {
        this.movieList = movies;
      });
  }
}
