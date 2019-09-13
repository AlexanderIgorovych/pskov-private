import { Component, OnInit } from '@angular/core';
import { TabSwitcherService } from '../../../shared/services/tab-switcher.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-responsible-storage-wrapper',
  templateUrl: './responsible-storage-wrapper.component.html',
  styleUrls: ['./responsible-storage-wrapper.component.scss']
})
export class ResponsibleStorageWrapperComponent implements OnInit {

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

    this.orderTypeTitle = this.switcherService.loadResourceData(getTypes);
    this.menuItems      = this.switcherService.getMenuItems();
    this.selected       = this.switcherService.getSelected()
  }

  onHandleChanger = e => {
    this.switcherService.onSelectedChange(e);
    this.selected = this.switcherService.getSelected();
  }
}
