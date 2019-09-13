import { Component, OnInit } from '@angular/core';

export interface ITabsMenuItem {
  label: string;
}

@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  selected: number;

  menuItems = [
    { label: 'ТЕКУЩИЕ ВЗВЕШИВАНИЯ' },
    { label: 'ОТВЕТСТВЕННОЕ ХРАНЕНИЕ' }
  ];

  constructor() {}

  ngOnInit() {}

  onClick() {}
}
