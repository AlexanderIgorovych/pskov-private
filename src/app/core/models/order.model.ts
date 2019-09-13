import {Payment} from './payment.model';
import {Documents} from './document.model';

export class Order {
  constructor(
    public type: number | null,
    public partner_id: number | null,
    public car_id: number | null,
    public trailer_id: number | null,
    public payment: Payment | null,
    public documents: Documents | null,
    public id?: number,
  ) {}
}
