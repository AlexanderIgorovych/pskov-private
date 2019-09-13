import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentCustomerWrapperComponent } from './shipment-customer-wrapper.component';

describe('ShipmentCustomerWrapperComponent', () => {
  let component: ShipmentCustomerWrapperComponent;
  let fixture: ComponentFixture<ShipmentCustomerWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipmentCustomerWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentCustomerWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
