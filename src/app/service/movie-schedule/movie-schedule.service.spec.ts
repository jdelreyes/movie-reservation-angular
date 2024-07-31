import { TestBed } from '@angular/core/testing';

import { MovieScheduleService } from './movie-schedule.service';

describe('MovieScheduleService', () => {
  let service: MovieScheduleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieScheduleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
