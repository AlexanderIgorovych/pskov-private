import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { ConfigService } from '../config.service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store/rootStore';

// this service is responsible for collection of all
// ORDER steps data and sending them to external source

export enum orderType {
  'приемка от ломосдатчика',
  'приемка при внутреннем перемещении',
  'отгрузка при внутреннем перемещении',
  'отгрузка покупателю',
  'переработка на сторону',
  'переработка/сортировка лома',
  'переработка АЦ',
  'инвентаризация'
}

export enum paymentType {
  cash,
  requisite,
  cashbox,
  qiwiSystem,
  qiwi
}

export interface OrderPayment {
  type: paymentType;
  id: number;
}

export interface OrderDocuments {
  psa: string[];
  ttn: string[];
  passport: string[];
}

export interface Order {
  type: orderType;
  partner_id: number;
  car_id: number;
  trailer_id?: number;
  payment: OrderPayment;
  documents: OrderDocuments;
}

@Injectable()
export class OrderService {
  constructor(
    private http: DataService,
    private config: ConfigService,
    private ngRedux: NgRedux<IAppState>
  ) {}

  @select((s: IAppState) => s.partner.pickedPartner) pickedPartner;
  @select((s: IAppState) => s.car.pickedCar) pickedCar;
  @select((s: IAppState) => s.car.autoSuggestedTrailerPicked)
  autoSuggestedTrailerPicked;

  generateOrder() {}
}
