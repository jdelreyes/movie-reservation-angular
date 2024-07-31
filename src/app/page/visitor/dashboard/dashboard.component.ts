import { Component, OnInit } from '@angular/core';
import { MovieScheduleResponse } from '../../../interface/dto';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { SidebarModule } from 'primeng/sidebar';
import { TheaterFinderComponent } from '../theater-finder/theater-finder.component';
import { MovieFinderComponent } from '../movie-finder/movie-finder.component';
import { AccordionModule } from 'primeng/accordion';
import { FormsModule } from '@angular/forms';
import {
  IsoStringToDateObjectPipe,
  UnderscoreToSpacePipe,
} from '../../../pipe';
import { TagModule } from 'primeng/tag';
import { DatePipe, NgOptimizedImage, TitleCasePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { MovieScheduleService } from '../../../service/movie-schedule/movie-schedule.service';
import { MovieService } from '../../../service/movie/movie.service';
import { TheaterService } from '../../../service/theater/theater.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CalendarModule,
    InputTextModule,
    ButtonModule,
    RouterLink,
    CardModule,
    ImageModule,
    SidebarModule,
    TheaterFinderComponent,
    MovieFinderComponent,
    AccordionModule,
    FormsModule,
    IsoStringToDateObjectPipe,
    UnderscoreToSpacePipe,
    TagModule,
    TitleCasePipe,
    DividerModule,
    SkeletonModule,
    NgOptimizedImage,
    DatePipe,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  title: string = 'Choose a movie to watch';
  movieId: number | null = null;
  theaterId: number | null = null;
  date: Date | null = null;

  isMovieSidebarVisible: boolean = false;
  isTheaterSidebarVisible: boolean = false;

  isLoading: boolean = false;

  movieLabel: string = 'Any Movie';
  theaterLabel: string = 'Any Theater';

  movieSchedules: MovieScheduleResponse[] = [];

  minDate: Date = new Date();
  maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 7));

  constructor(
    private movieScheduleService: MovieScheduleService,
    private movieService: MovieService,
    private theaterService: TheaterService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.movieId = params['movie'] ? Number(params['movie']) : null;
      this.theaterId = params['theater'] ? Number(params['theater']) : null;
      this.date = params['date'] ? this.parseISOString(params['date']) : null;

      if (this.movieId) this.populateMovieLabel(this.movieId);
      if (this.theaterId) this.populateTheaterLabel(this.theaterId);

      this.getMovieSchedules();
    });
  }

  receiveChosenMovie($event: boolean) {
    this.isMovieSidebarVisible = $event;
  }

  receiveChosenTheater($event: boolean) {
    this.isTheaterSidebarVisible = $event;
  }

  removeMovieQueryParameter() {
    this.movieId = null;
    this.movieLabel = 'Any Movie';

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { movie: this.movieId },
      queryParamsHandling: 'merge',
    });
  }

  removeTheaterQueryParameter() {
    this.theaterId = null;
    this.theaterLabel = 'Any Theater';

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { theater: this.theaterId },
      queryParamsHandling: 'merge',
    });
  }

  removeDateQueryParameter() {
    this.date = null;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { date: this.date },
      queryParamsHandling: 'merge',
    });
  }

  onDateChange(event: Date) {
    this.date = event;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { date: this.date.toISOString() },
      queryParamsHandling: 'merge',
    });
  }

  private getMovieSchedules() {
    this.movieScheduleService
      .getMovieSchedules(
        this.theaterId,
        this.movieId,
        !!this.date ? this.date.toISOString() : null
      )
      .subscribe({
        next: (v) => {
          this.movieSchedules = v;
        },
      });
  }

  private populateMovieLabel(id: number) {
    this.movieService.getMovie(id).subscribe({
      next: (v) => {
        this.movieLabel = v.title;
      },
    });
  }

  private populateTheaterLabel(id: number) {
    this.theaterService.getTheater(id).subscribe({
      next: (v) => {
        this.theaterLabel = v.name;
      },
    });
  }

  private parseISOString(s: string): Date {
    const b: any[] = s.split(/\D+/);
    return new Date(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]);
  }
}
