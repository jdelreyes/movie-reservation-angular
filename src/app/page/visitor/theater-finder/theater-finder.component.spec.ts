import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TheaterFinderComponent } from './theater-finder.component';

describe('TheaterFinderComponent', () => {
  let component: TheaterFinderComponent;
  let fixture: ComponentFixture<TheaterFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TheaterFinderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TheaterFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
