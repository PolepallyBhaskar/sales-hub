import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrossSellProductsComponent } from './cross-sell-products.component';

describe('CrossSellProductsComponent', () => {
  let component: CrossSellProductsComponent;
  let fixture: ComponentFixture<CrossSellProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrossSellProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrossSellProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
