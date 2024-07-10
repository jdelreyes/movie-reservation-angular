import { Component, OnInit } from '@angular/core';
import { MovieScheduleResponse } from '../../../dto';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  private movieSchedules: MovieScheduleResponse[] = [];

  public constructor(
    private visitorService: VisitorService,
    private activatedRoute: ActivatedRoute
  ) {}

  public ngOnInit(): void {}
}
