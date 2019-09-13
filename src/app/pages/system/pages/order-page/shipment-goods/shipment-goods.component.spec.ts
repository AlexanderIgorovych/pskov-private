import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentGoodsComponent } from './shipment-goods.component';

describe('ShipmentGoodsComponent', () => {
  let component: ShipmentGoodsComponent;
  let fixture: ComponentFixture<ShipmentGoodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentGoodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentGoodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
