import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, pipe } from 'rxjs';
import { OrderQuery } from '../../../../core/store/order/order.query';
import { orderData } from '../../shared/data/order.data';
import { filter } from 'rxjs/operators';

interface IOrderPageDataItem {
  label: string;
}

const ORDER_TABS_MENU: IOrderPageDataItem[] = [
  {
    label: 'ОФОРМЛЕНИЕ'
  },
  {
    label: 'ВЗВЕШИВАНИЯ'
  }
];

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit, OnDestroy {
  selected = 0;
  menuItems = ORDER_TABS_MENU;
  orderTypeTitle: string;
  weighIndex : number = 0;
  selectedPage = 0;

  menuItemsInvertory = [
    {
      label : "ВЗВЕШИВАНИЯ"
    }
  ]

  s1: Subscription;

  getSelected = () => this.selected

  constructor(private orderQuery: OrderQuery) {}

  ngOnInit() {
    this.s1 = this.orderQuery
      .getOrder()
      .pipe(filter(data => data.type !== null && data.type !== undefined))
      .subscribe(order => {
        this.orderTypeTitle = orderData[order.type].label;
        this.selectedPage = order.type;
        // this.selected = order.type;
        // console.log(this.selected);
      });
  }
  ngOnDestroy() {
    this.s1.unsubscribe();
  }

  handleClickRoute = () => console.log('handle click router')


  onSelectedChange = (e) => this.selected = e;

}
