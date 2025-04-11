import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstanciaBlogComponent } from './instancia-blog.component';

describe('InstanciaBlogComponent', () => {
  let component: InstanciaBlogComponent;
  let fixture: ComponentFixture<InstanciaBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InstanciaBlogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InstanciaBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
