import { Component, OnInit } from '@angular/core';
import { TheaterResponse } from '../../../interface/dto';
import { VisitorService } from '../../../service/visitor/visitor.service';

@Component({
  selector: 'app-theater-finder',
  standalone: true,
  imports: [],
  templateUrl: './theater-finder.component.html',
})
export class TheaterFinderComponent implements OnInit {
  public theaters: TheaterResponse[] = [];

  public constructor(private visitorService: VisitorService) {}

  public ngOnInit(): void {}

  public getTheaters(name: string) {
    this.visitorService.getTheatersByNameContaining(name).subscribe({
      next: (v) => {
        this.theaters = v;
      },
    });
  }
}
