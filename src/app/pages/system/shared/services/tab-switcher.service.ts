import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { orderData } from '../../shared/data/order.data';
import { OrderQuery } from '../../../../core/store/order/order.query';
import { filter } from 'rxjs/internal/operators/filter';

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

@Injectable({
  providedIn: 'root'
})
export class TabSwitcherService {
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

  // gets
  getSelected  = () => this.selected;
  getMenuItems = () => this.menuItems;

  s1: Subscription;


  loadResourceData (type) {
    this.orderTypeTitle = orderData[type].label
    this.selectedPage   = type;

    return this.orderTypeTitle;
  }

  ngOnDestroy() {
    this.s1.unsubscribe();
  }


  onSelectedChange = e => this.selected = e;

  constructor(private orderQuery: OrderQuery) { }
}
