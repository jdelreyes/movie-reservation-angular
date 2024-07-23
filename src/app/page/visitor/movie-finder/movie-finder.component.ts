import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MovieResponse } from '../../../interface/dto';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { InputTextModule } from 'primeng/inputtext';
import { ImageModule } from 'primeng/image';
import { SpaceToDashPipe } from '../../../pipe';
import { LowerCasePipe } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { AutoFocusModule } from 'primeng/autofocus';

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
    ButtonModule,
    AutoFocusModule,
  ],
  templateUrl: './movie-finder.component.html',
})
export class MovieFinderComponent implements OnInit {
  movies: MovieResponse[] = [];
  searchControl: FormControl = new FormControl();

  @Output()
  isMovieChosenEvent = new EventEmitter<boolean>(false);

  constructor(
    private visitorService: VisitorService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((title) => {
        this.getMovies(title);
      });
  }

  changeMovieQueryParam(id: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { movie: id },
      queryParamsHandling: 'merge',
    });
  }

  chooseMovie() {
    this.isMovieChosenEvent.emit(false);
  }

  private getMovies(title: string): void {
    this.visitorService.getAvailableMoviesByTitleContaining(title).subscribe({
      next: (v) => {
        this.movies = v;
      },
    });
  }
}
