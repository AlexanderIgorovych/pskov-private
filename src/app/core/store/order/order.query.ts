import {Injectable} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {Order} from '../../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderQuery {
  @select(s => s.order)
  private order: Observable<Order>;


  // Exports
  getOrder(): Observable<Order> {
    return this.order;
  }
}
