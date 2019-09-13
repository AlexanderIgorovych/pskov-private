import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-invertory-wrapper',
  templateUrl: './invertory-wrapper.component.html',
  styleUrls: ['./invertory-wrapper.component.scss']
})
export class InvertoryWrapperComponent implements OnInit {

  menuItemsInvertory = [
    {
      label : "ВЗВЕШИВАНИЯ"
    }
  ]

  title = "ИНВЕНТАРИЗАЦИЯ";
  selected;

  constructor() { }

  ngOnInit() {
  }

}
