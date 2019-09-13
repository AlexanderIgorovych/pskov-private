import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentGoodsWrapperComponent } from './shipment-goods-wrapper.component';

describe('ShipmentGoodsWrapperComponent', () => {
  let component: ShipmentGoodsWrapperComponent;
  let fixture: ComponentFixture<ShipmentGoodsWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentGoodsWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentGoodsWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
