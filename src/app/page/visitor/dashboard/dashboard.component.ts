import { Component, OnInit } from '@angular/core';
import { MovieScheduleResponse } from '../../../interface/dto';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { SidebarModule } from 'primeng/sidebar';
import { TheaterFinderComponent } from '../theater-finder/theater-finder.component';
import { MovieFinderComponent } from '../movie-finder/movie-finder.component';

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
  ],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private movieId: number | null = null;
  private theaterId: number | null = null;

  public isMovieSidebarVisible: boolean = false;
  public isTheaterSidebarVisible: boolean = false;

  public isLoading = false;

  public movieLabel!: string;
  public theaterLabel!: string;

  public movieSchedules: MovieScheduleResponse[] = [];

  public constructor(
    private visitorService: VisitorService,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['movie']) {
        this.movieId = params['movie'];
        this.getMovie(Number(params['movie']));
      }
      if (params['theater']) {
        this.theaterId = params['theater'];
        this.getTheater(Number(params['theater']));
      }

      this.getMovieSchedules();
    });
  }

  public receiveChosenMovie($event: boolean) {
    this.isMovieSidebarVisible = $event;
  }

  public receiveChosenTheater($event: boolean) {
    this.isTheaterSidebarVisible = $event;
  }

  private getMovieSchedules() {
    this.visitorService
      .getMovieSchedules(this.theaterId, this.movieId)
      .subscribe({
        next: (v) => {
          this.movieSchedules = v;
        },
      });
  }

  private getMovie(id: number) {
    this.visitorService.getMovie(id).subscribe({
      next: (v) => {
        this.movieLabel = v.title;
      },
    });
  }

  private getTheater(id: number) {
    this.visitorService.getTheater(id).subscribe({
      next: (v) => {
        this.theaterLabel = v.name;
      },
    });
  }
}
