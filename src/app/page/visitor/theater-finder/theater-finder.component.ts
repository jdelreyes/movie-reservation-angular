import { Component, OnInit } from '@angular/core';
import { TheaterResponse } from '../../../interface/dto';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { InputTextModule } from 'primeng/inputtext';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-theater-finder',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, InputTextModule, DataViewModule, ButtonModule],
  templateUrl: './theater-finder.component.html',
})
export class TheaterFinderComponent implements OnInit {
  public theaters: TheaterResponse[] = [];
  public searchControl: FormControl = new FormControl();

  public constructor(private visitorService: VisitorService) {}

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((name) => {
        this.getTheaters(name);
      });
  }

  public getTheaters(name: string) {
    this.visitorService.getTheatersByNameContaining(name).subscribe({
      next: (v) => {
        this.theaters = v;
      },
    });
  }
}
