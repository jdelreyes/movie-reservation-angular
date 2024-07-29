import { Component, OnDestroy, OnInit } from '@angular/core';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { MovieResponse } from '../../../interface/dto';
import { LowerCasePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';
import { PageEvent } from '../../../interface/event';
import { Subject, takeUntil, tap } from 'rxjs';
import { SpaceToDashPipe } from '../../../pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LowerCasePipe,
    RouterLink,
    CardModule,
    ImageModule,
    SkeletonModule,
    PaginatorModule,
    SpaceToDashPipe,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy {
  title: string = 'Movies';
  movieList: MovieResponse[] = [];

  totalRecords: number = 4;

  first: number = 0;
  page: number = 0;
  size: number = 4;

  isLoading: boolean = true;
  unsubscribe$: Subject<unknown> = new Subject();

  constructor(
    private visitorService: VisitorService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      if (params['page']) this.page = params['page'];
      if (params['size']) this.size = params['size'];
    });
    this.getAvailableMovies();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  onPageChange(event: PageEvent) {
    this.page = event.page;
    this.size = event.rows;

    this.router.navigate([], {
      relativeTo: this.activateRoute,
      queryParams: { page: this.page, size: this.size },
      queryParamsHandling: 'merge',
    });

    this.getAvailableMovies();
    this.showUp();
  }

  private getAvailableMovies(): void {
    this.visitorService
      .getAvailableMovies(this.page, this.size)
      .pipe(
        tap({
          next: (movies: MovieResponse[]) => {
            if (movies) {
              this.movieList = movies;
              this.totalRecords = movies.length;

              this.isLoading = false;
            }
          },
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  private showUp(): void {
    window.scroll(0, 0);
  }
}
