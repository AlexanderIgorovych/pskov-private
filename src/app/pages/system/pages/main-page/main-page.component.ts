import { Component, OnInit } from '@angular/core';
import { PreviewItemService } from '../../shared/services/main-page/preview-item.service';
import { LoadMenuItems, LoadResponsibleItems, SavePickedAmountResponsible } from '../../../../core/store/partner/partner.actions';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../../core/store/rootStore';
import { pluck } from 'rxjs/operators';

interface IMainPageDataItem {
  label: string;
  empty_state: string;
  data?: any[];
}

const MAIN_TABS_MENU: IMainPageDataItem[] = [
  {
    label: 'ТЕКУЩИЕ ВЗВЕШИВАНИЯ',
    empty_state: 'Здесь будет отображаться таблица грузов на взвешивании',
    data: []
  },
  {
    label: 'ОТВЕТСТВЕННОЕ ХРАНЕНИЕ',
    empty_state:
      'Здесь будет отображаться таблица грузов на ответственном хранении',
    data: []
  }
];

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  @select((s : IAppState) => s.partner.menuItems) menuElements;
  @select((s : IAppState) => s.partner.menuStorageItem) menuElementsStorage;

  menuItems = MAIN_TABS_MENU;
  selected = 0;

  currentWeigh = this.menuItems[0]

  currentPage = 1;
  todtalData;
  todtalDataSaved;
  ajaxLoader : boolean;
  ajaxLoaderStorage : boolean;

  constructor(private menuService : PreviewItemService, private ngRedux : NgRedux<IAppState>) {}

  handlePageChanger = (e) => {
    this.currentPage = e;
    this.loadResources('ajaxLoader', LoadMenuItems, this.menuElements);
  }

  /* This function load all orders from backend, depends on choosed page -
    recieve 3 args = loader, dispatchName, itemsStore, it needs, for independed storage
    data in different stores

    loaderName = loader
    dispatchName = name of action dispatcher
    itemsStore = variable which was connected to redux store field
   */

  loadResources = (loaderName, dispatchName, itemsStore, amount = (this.currentPage - 1) * 10, offset = 10, q?) => {

    const self = this;
    self[loaderName] = true;
    this.menuService.getOrders(this.selected, amount, offset, q)
      .subscribe(
        res => this.ngRedux.dispatch(new dispatchName(res.data).createAction()),
        err => console.log(err),
        ()  => itemsStore.subscribe(res => {
          this.menuItems[this.selected].data = res.items;
          self[loaderName] = false;
        })
      )
  }

  onLoadResponsible = e => {
    this.getTotalData('ajaxLoaderStorage', 'todtalDataSaved', () => {
      this.loadResources('ajaxLoaderStorage', LoadResponsibleItems, this.menuElementsStorage, e.offset, e.amount);
    })
  };

  onFilteredSearch = e => {
    this.getTotalData('ajaxLoaderStorage', 'todtalDataSaved', () => {
      this.loadResources('ajaxLoaderStorage', LoadResponsibleItems, this.menuElementsStorage, undefined, undefined, e);
    })
  }


  ngOnInit() {
    this.getTotalData('ajaxLoader', 'todtalData', () => {
      this.loadResources('ajaxLoader', LoadMenuItems, this.menuElements)
    })
  }

  getTotalData = (loaderName : string, totalVariable : string, callback : Function) => {
    const self = this;

    new Promise((resolve)  => {
        self[loaderName] = true;
        this.menuService.getOrders(this.selected, 0, 1).pipe(
          pluck('data', 'total')
        ).subscribe(res => {
          this[totalVariable] = res;
          resolve()
        })
    }).then(() => callback())
  }

  // Load items with other status ('Ответственное хранение')

  onSelectedChange = () => {
    if (this.selected === 1) {
      this.getTotalData('ajaxLoaderStorage', 'todtalDataSaved', () => {
        this.loadResources('ajaxLoaderStorage', LoadResponsibleItems, this.menuElementsStorage)
      });
    }

  }
}
