import { Component, OnInit } from '@angular/core';
import { TabSwitcherService } from '../../../shared/services/tab-switcher.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'


@Component({
  selector: 'app-shipment-goods-wrapper',
  templateUrl: './shipment-goods-wrapper.component.html',
  styleUrls: ['./shipment-goods-wrapper.component.scss']
})
export class ShipmentGoodsWrapperComponent implements OnInit {

  selected = 0;
  menuItems;
  type
  orderTypeTitle

  constructor(
    private switcherService : TabSwitcherService,
    private route: ActivatedRoute,
    private router: Router,
    ) {}

  ngOnInit() {
    const getTypes  = this.route.snapshot.paramMap.get('type');

    this.orderTypeTitle =  this.switcherService.loadResourceData(getTypes);
    this.menuItems      = this.switcherService.getMenuItems();
    this.selected       = this.switcherService.getSelected()
  }

  onHandleChanger = e => {
    this.switcherService.onSelectedChange(e);
    this.selected = this.switcherService.getSelected();
  }

}
