import {TestBed} from '@angular/core/testing';

import {VisitorService} from './visitor.service';
import {MovieResponse} from "../../dto";

describe('VisitorService', () => {
  let service: VisitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve movies', () => {
    let movieList;

    service.getAvailableMovies().subscribe((m: MovieResponse[]): void => {
      movieList=m;
    })

    expect(movieList).toBeDefined()
  })
});
