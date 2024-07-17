import { Component, OnInit } from '@angular/core';
import { MovieScheduleResponse } from '../../../interface/dto';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { ActivatedRoute } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CalendarModule, InputTextModule],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private movieId: number = Number(
    this.activatedRoute.snapshot.paramMap.get('movie')
  );
  private theaterId: number = Number(
    this.activatedRoute.snapshot.paramMap.get('theater')
  );

  public movieSchedules: MovieScheduleResponse[] = [];

  public constructor(
    private visitorService: VisitorService,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {
    this.getMovieSchedules();
  }

  public getMovieSchedules() {
    this.visitorService.getMovieSchedules().subscribe({
      next: (v) => {
        this.movieSchedules = v;
      },
    });
  }
}
