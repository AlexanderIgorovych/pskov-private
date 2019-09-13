import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-preview-item',
  templateUrl: './preview-item.component.html',
  styleUrls: ['./preview-item.component.scss']
})
export class PreviewItemComponent implements OnInit {

  @Input() order;

  orderType : string;

  ordersType = [
    { title : 'Приемка от ломосдатчика' },
    { title : 'Приемка при внутреннем перемещении' },
    { title : 'Отгрузка при внутреннем перемещении' },
    { title : 'Отгрузка покупателю' },
    { title : 'Переработка на сторону' },
    { title : 'Переработка/сортировка лома' },
    { title : 'Переработка АЦ'},
    { title : 'Инвентаризация'}
  ]

  constructor() { }

  detectOrderType = (type) => {
    this.orderType = this.ordersType[type].title
  }

  ngOnInit() {
    this.detectOrderType(this.order.type);

    
  }

}
