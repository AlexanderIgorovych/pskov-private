import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-shipment-customer',
  templateUrl: './shipment-customer.component.html',
  styleUrls: ['./shipment-customer.component.scss']
})
export class ShipmentCustomerComponent implements OnInit {

  @ViewChild('stepper', { read: MatStepper }) stepper;

  @Output() handleSelectedPage = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  nextToWeigh = (e) => this.handleSelectedPage.emit(e)

  nextStep(){
    this.stepper.next();
  }

  previousStep(){
    this.stepper.previous();
  }

}
