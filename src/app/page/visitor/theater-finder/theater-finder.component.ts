import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TheaterResponse } from '../../../interface/dto';
import { VisitorService } from '../../../service/visitor/visitor.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoFocusModule } from 'primeng/autofocus';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

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
  public theaters: TheaterResponse[] = [];
  public searchControl: FormControl = new FormControl();

  @Output()
  public isTheaterChosenEvent = new EventEmitter<boolean>(false);

  public constructor(
    private visitorService: VisitorService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((name) => {
        this.getTheaters(name);
      });
  }

  public changeTheaterQueryParam(id: number) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { theater: id },
      queryParamsHandling: 'merge',
    });
  }

  public chooseTheater() {
    this.isTheaterChosenEvent.emit(false);
  }

  private getTheaters(name: string) {
    this.visitorService.getTheatersByNameContaining(name).subscribe({
      next: (v) => {
        this.theaters = v;
      },
    });
  }
}
