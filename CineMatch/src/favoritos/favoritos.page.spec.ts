import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FavoritosPage } from './favoritos.page';

describe('FavoritosComponent', () => {
  let component: FavoritosPage;
  let fixture: ComponentFixture<FavoritosPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FavoritosPage],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
