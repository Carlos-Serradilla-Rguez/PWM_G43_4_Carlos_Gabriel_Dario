import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearHiloComponent } from './crear-hilo.component';

describe('CrearHiloComponent', () => {
  let component: CrearHiloComponent;
  let fixture: ComponentFixture<CrearHiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearHiloComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearHiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
