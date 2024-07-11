import { Component, OnDestroy, OnInit } from '@angular/core';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { MovieResponse } from '../../../dto';
import { Base64Pipe } from '../../../pipe/base64.pipe';
import { LowerCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ImageModule } from 'primeng/image';
import { CardModule } from 'primeng/card';
import { SkeletonModule } from 'primeng/skeleton';
import { PaginatorModule } from 'primeng/paginator';
import { PageEvent } from '../../../event';
import { finalize, Subject, takeUntil, tap } from 'rxjs';
import { SourceTextModule } from 'node:vm';

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
export class HomeComponent implements OnInit, OnDestroy {
  public title: string = 'Movies';
  public movieList: MovieResponse[] = [];

  public first: number = 0;
  public page: number = 0;
  public size: number = 3;

  public isLoading: boolean = true;
  private unsubscribe$: Subject<unknown> = new Subject();

  constructor(private visitorService: VisitorService) {}

  public ngOnInit(): void {
    this.getAvailableMovies();
  }

  public ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }

  public onPageChange(event: PageEvent) {
    this.page = event.page;
    this.size = event.rows;

    console.log(this.page)
    console.log(this.size)

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
            }
          },
        }),
        finalize(() => {
          this.isLoading = false;
        }),
        takeUntil(this.unsubscribe$)
      )
      .subscribe();
  }

  private showUp(): void {
    window.scroll(0, 0);
  }
}
