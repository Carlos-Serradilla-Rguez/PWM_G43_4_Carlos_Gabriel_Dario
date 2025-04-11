import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeliculasSeriesComponent } from './peliculas-series.component';

describe('PeliculasSeriesComponent', () => {
  let component: PeliculasSeriesComponent;
  let fixture: ComponentFixture<PeliculasSeriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PeliculasSeriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PeliculasSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
