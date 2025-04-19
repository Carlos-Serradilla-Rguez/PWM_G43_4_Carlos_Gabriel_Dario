import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesciptorPeliculaComponent } from './desciptor-pelicula.component';

describe('DesciptorPeliculaComponent', () => {
  let component: DesciptorPeliculaComponent;
  let fixture: ComponentFixture<DesciptorPeliculaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesciptorPeliculaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesciptorPeliculaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
