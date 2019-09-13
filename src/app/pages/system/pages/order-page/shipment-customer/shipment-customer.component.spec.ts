import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentCustomerComponent } from './shipment-customer.component';

describe('ShipmentCustomerComponent', () => {
  let component: ShipmentCustomerComponent;
  let fixture: ComponentFixture<ShipmentCustomerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentCustomerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentCustomerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
