import { Component, OnInit } from '@angular/core';

interface IMainPageDataItem {
  label: string;
  empty_state: string;
  data?: any[];
}

const MAIN_TABS_MENU: IMainPageDataItem[] = [
  {
    label: 'ТЕКУЩИЕ ВЗВЕШИВАНИЯ',
    empty_state: 'Здесь будет отображаться таблица грузов на взвешивании',
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
  },
  {
    label: 'ОТВЕТСТВЕННОЕ ХРАНЕНИЕ',
    empty_state:
      'Здесь будет отображаться таблица грузов на ответственном хранении'
    // data: [1, 2, 3]
  }
];

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss']
})
export class NotificationPageComponent implements OnInit {
  menuItems = MAIN_TABS_MENU;
  selected = 0;

  constructor() {}

  ngOnInit() {}

  onSelectedChange() {}
}
