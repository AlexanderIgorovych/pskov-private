import { Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../../../core/store/rootStore';
import { ApiService } from '../../../../../core/http/api.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-responsible-storage-list',
  templateUrl: './responsible-storage-list.component.html',
  styleUrls: ['./responsible-storage-list.component.scss']
})
export class ResponsibleStorageListComponent implements OnInit, OnChanges {


  @Output() loadOnChange      = new EventEmitter();
  @Output() searchDataByValue = new EventEmitter();
  @Input() ajaxLoader;

  @select((s : IAppState) => s.partner.responsiblePickedAmount) pickedAmount;
  @select((s : IAppState) => s.partner.menuStorageItem) itemsMenu;

  s1 : Subscription;

  dataSource;
  dataLoaded

  dataTotal;
  arrTotally = [];

  page              : number = 1;
  allItemsCounter   : number;
  amountValuePicked : number = 2;

  isListShow : boolean = false;

  displayedColumns: any[] = [
    {
      name : 'Дата/Время',
      props : 'id',
    },
    {
      name : 'Наименование',
      props: 'name'
    },
    {
      name : 'Номер машины',
      props : 'car',
    },
    {
      name : 'Номер паспорта ломосдатчика',
      props : `passport`,
    },
    {
      name : 'Действие',
      props : 'action'
    }
  ];



  fieldAmountValue : any[] = [
    {
      amount : 2
    },
    {
      amount : 5,
    },
    {
      amount : 7
    }
  ]

  ngOnInit() {

    this.pickedAmount.subscribe(amount => {
      // this.amountValuePicked = amount
    })

    this.itemsMenu.pipe(
      filter(res => res !== undefined)
    ).subscribe(res => {
      const correctItems = res.items.map(element => {
        return {
          id       : element.id,
          car      : element.car.plate_number,
          name     : element.partner.name,
          passport : element.partner.passport_number
        }
      })
      this.dataLoaded = correctItems;
      this.dataTotal  = res.total;
      this.correctPaginatorBuiilder()
    });
  }

  handleFilter = (e) => {
    this.searchDataByValue.emit(e.target.value)
  }

  correctPaginatorBuiilder = () => {
    this.arrTotally = [];
    this.allItemsCounter  = this.dataTotal;

    let counterPage = Math.ceil(this.allItemsCounter / this.amountValuePicked);

    for (let i = counterPage; i > 0; i--) {
      this.arrTotally.push(i);
    }
  }

  pickField = (e) => {
    this.page = 1;
    this.isListShow = false;
    this.amountValuePicked = +e.target.innerText;
    this.arrTotally = [1];
    this.loadOnChange.emit({
      offset : 0,
      amount : this.amountValuePicked
    })
  }

  handleListShow = () => this.isListShow = !this.isListShow;

  pageChangeHandler = e => {

    const oldPage = this.page;
    this.page = e;

    let counter;

    if (oldPage <= this.page) {

      if (this.page !== 2) {
        counter = this.page * this.amountValuePicked - this.amountValuePicked;

      } else {
        counter = this.amountValuePicked;
      }

    } else {

      if (this.page !== 2) {
        counter = Math.ceil(oldPage / this.amountValuePicked + this.amountValuePicked)

      } else {
        counter = this.amountValuePicked;
      }
    }

    const counterValue = e === 1 ? 0 : counter;
    this.loadOnChange.emit({
      offset : counterValue,
      amount : this.amountValuePicked
    })
  }

  columnsToDisplay: string[] = this.displayedColumns.map(element => element.name);

  constructor(
    private notifyService : NotificationService,
    private apiService  : ApiService,
    private ngRedux     : NgRedux<IAppState>
  ) {}

  ngOnChanges(changes : SimpleChanges){

  }


}
