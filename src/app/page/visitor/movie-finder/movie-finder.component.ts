import { Component, OnInit } from '@angular/core';
import { MovieResponse } from '../../../interface/dto';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';
import { SpaceToDashPipe } from '../../../pipe';
import { LowerCasePipe } from '@angular/common';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-movie-finder',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    InputTextModule,
    ImageModule,
    SpaceToDashPipe,
    LowerCasePipe,
    CardModule,
  ],
  templateUrl: './movie-finder.component.html',
})
export class MovieFinderComponent implements OnInit {
  public movies: MovieResponse[] = [];
  public searchControl: FormControl = new FormControl();

  constructor(private visitorService: VisitorService) {}

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((title) => {
        this.getMovies(title);
      });
  }

  private getMovies(title: string): void {
    this.visitorService.getAvailableMoviesByTitleContaining(title).subscribe({
      next: (v) => {
        this.movies = v;
      },
    });
  }
}
