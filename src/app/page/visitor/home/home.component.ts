import { Component, OnDestroy, OnInit } from '@angular/core';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { MovieResponse } from '../../../interface/dto';
import { Base64Pipe } from '../../../pipe/base64.pipe';
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
    Base64Pipe,
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
  public title: string = 'Movies';
  public movieList: MovieResponse[] = [];

  public totalRecords: number = 0;

  public first: number = 0;
  public page: number = 0;
  public size: number = 4;

  public isLoading: boolean = true;
  private unsubscribe$: Subject<unknown> = new Subject();

  public constructor(
    private visitorService: VisitorService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.activateRoute.queryParams.subscribe((params) => {
      if (params['page']) this.page = params['page'];
      if (params['size']) this.size = params['size'];
    });
    this.getAvailableMovies();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  public onPageChange(event: PageEvent) {
    this.page = event.page;
    this.size = event.rows;

    this.router.navigate([''], {
      queryParams: { page: this.page, size: this.size },
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
