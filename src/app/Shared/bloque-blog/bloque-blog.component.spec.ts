import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BloqueBlogComponent } from './bloque-blog.component';

describe('BloqueBlogComponent', () => {
  let component: BloqueBlogComponent;
  let fixture: ComponentFixture<BloqueBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BloqueBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BloqueBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
