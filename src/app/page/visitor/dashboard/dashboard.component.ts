import { Component, OnInit } from '@angular/core';
import { MovieScheduleResponse } from '../../../interface/dto';
import { VisitorService } from '../../../service/visitor/visitor.service';
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
  DateToDateStringPipe,
  UnderscoreToSpacePipe,
  DateToLocaleTimeStringPipe,
} from '../../../pipe';
import { TagModule } from 'primeng/tag';
import { TitleCasePipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';

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
    DateToDateStringPipe,
    UnderscoreToSpacePipe,
    DateToLocaleTimeStringPipe,
    TagModule,
    TitleCasePipe,
    DividerModule,
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  public movieId: number | null = null;
  public theaterId: number | null = null;
  public date: Date | null = null;

  public isMovieSidebarVisible = false;
  public isTheaterSidebarVisible = false;

  public isLoading = false;

  public movieLabel: string = 'Any Movie';
  public theaterLabel: string = 'Any Theater';

  public movieSchedules: MovieScheduleResponse[] = [];

  public minDate: Date = new Date();
  public maxDate: Date = new Date(new Date().setDate(new Date().getDate() + 7));

  public constructor(
    private visitorService: VisitorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.movieId = params['movie'] ? Number(params['movie']) : null;
      this.theaterId = params['theater'] ? Number(params['theater']) : null;
      this.date = params['date'] ? this.parseISOString(params['date']) : null;

      if (this.movieId) this.populateMovieLabel(this.movieId);
      if (this.theaterId) this.populateTheaterLabel(this.theaterId);

      this.getMovieSchedules();
    });
  }

  public receiveChosenMovie($event: boolean) {
    this.isMovieSidebarVisible = $event;
  }

  public receiveChosenTheater($event: boolean) {
    this.isTheaterSidebarVisible = $event;
  }

  public removeMovieQueryParameter() {
    this.movieId = null;
    this.movieLabel = 'Any Movie';

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { movie: this.movieId },
      queryParamsHandling: 'merge',
    });
  }

  public removeTheaterQueryParameter() {
    this.theaterId = null;
    this.theaterLabel = 'Any Theater';

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { theater: this.theaterId },
      queryParamsHandling: 'merge',
    });
  }

  public removeDateQueryParameter() {
    this.date = null;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { date: this.date },
      queryParamsHandling: 'merge',
    });
  }

  public onDateChange(event: Date) {
    this.date = event;

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { date: this.date.toISOString() },
      queryParamsHandling: 'merge',
    });
  }

  private getMovieSchedules() {
    this.visitorService
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
    this.visitorService.getMovie(id).subscribe({
      next: (v) => {
        this.movieLabel = v.title;
      },
    });
  }

  private populateTheaterLabel(id: number) {
    this.visitorService.getTheater(id).subscribe({
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
