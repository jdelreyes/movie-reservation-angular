import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TheaterResponse } from '../../../interface/dto';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoFocusModule } from 'primeng/autofocus';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TheaterService } from '../../../service/theater/theater.service';

@Component({
  selector: 'app-theater-finder',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    AutoFocusModule,
    CommonModule,
  ],
  templateUrl: './theater-finder.component.html',
})
export class TheaterFinderComponent implements OnInit {
  theaters: TheaterResponse[] = [];
  searchControl: FormControl = new FormControl();

  @Output()
  isTheaterChosenEvent = new EventEmitter<boolean>(false);

  constructor(
    private theaterService: TheaterService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((name) => {
        this.getTheaters(name);
      });
  }

  changeTheaterQueryParam(id: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { theater: id },
      queryParamsHandling: 'merge',
    });
  }

  chooseTheater() {
    this.isTheaterChosenEvent.emit(false);
  }

  private getTheaters(name: string) {
    this.theaterService.getTheatersByNameContaining(name).subscribe({
      next: (theaters: TheaterResponse[]) => {
        this.theaters = theaters;
      },
    });
  }
}
