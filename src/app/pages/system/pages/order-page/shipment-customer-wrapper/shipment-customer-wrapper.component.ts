import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TabSwitcherService } from '../../../shared/services/tab-switcher.service';

@Component({
  selector: 'app-shipment-customer-wrapper',
  templateUrl: './shipment-customer-wrapper.component.html',
  styleUrls: ['./shipment-customer-wrapper.component.scss']
})
export class ShipmentCustomerWrapperComponent implements OnInit {

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
