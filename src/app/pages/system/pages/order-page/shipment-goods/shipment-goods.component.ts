import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-shipment-goods',
  templateUrl: './shipment-goods.component.html',
  styleUrls: ['./shipment-goods.component.scss']
})
export class ShipmentGoodsComponent implements OnInit {

  @Output() weighNext = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  cutterWasPicked = (e) => this.weighNext.emit(e);

}
