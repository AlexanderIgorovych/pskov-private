import { Component, OnInit } from '@angular/core';
import { NotificationEntity } from '../../../../shared/entitys/notification.entity';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { filter, pluck } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../../../../core/http/api.service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../../../../core/store/rootStore';
import { GetNotificationCount } from '../../../../../../core/store/partner/partner.actions';


@Component({
  selector: 'app-notif-preview',
  templateUrl: './notif-preview.component.html',
  styleUrls: ['./notif-preview.component.scss']
})
export class NotifPreviewComponent implements OnInit {

  s1 : Subscription;

  dataTotal;
  arrTotal = [];
  loader : boolean = false;

  page              : number = 1;
  allItemsCounter   : number;
  amountValuePicked : number = 2;

  isListShow : boolean = false;

  displayedColumns: any[] = [
    {
      name : 'Дата/Время',
      props : 'date',
    },
    {
      name : 'Номер машины',
      props : 'car_plate_number',
    },
    {
      name : 'Текст уведомления',
      props : 'text',
    },
    {
      name : 'Действия',
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

  columnsToDisplay: string[] = this.displayedColumns.map(element => element.name);

  dataSource;

  notificationCount;

  @select((s : IAppState) => s.partner.notificationPickedAmount) notificationPicked;

  // Handle array of notification which has been seen

  handleSeenNotify = () => {
    const data = this.dataSource.map(element => {
      if (element.seen === true) return element.id

    }).filter(el => el !== undefined);

    this.notifyService.notificationWasSeen(data);
  }

  constructor(
    private notifyService : NotificationService,
    private apiService  : ApiService,
    private ngRedux     : NgRedux<IAppState>
  ) {}

  // Load Lists of notifications

  loadAllItem = (offset?, amount?) => {
    this.notifyService.getNotificationList(offset, amount);

    this.s1 = this.notifyService.listOfNotification.pipe(
      filter(res => res)

    ).subscribe(data => {
      if (data.items !== null) {

        this.dataSource       = data.items;
        this.allItemsCounter  = data.total;

        this.dataTotal  = [];

        let counterPage = Math.ceil(data.total / this.amountValuePicked);

        this.arrTotal = [];

        for (let i = counterPage; i > 0; i--) {
          this.arrTotal.push(i);
        }

        // this.s1.unsubscribe();
      }
    });
  };

  handleSeen = (e) => {

    if (e.seen === false) {
      this.notifyService.notificationWasSeen([e.id])

      this.apiService.get('notifications.count').pipe(
        pluck('data', 'count')
      ).subscribe(
        res => {
          this.notificationCount = res;
          this.ngRedux.dispatch(new GetNotificationCount(res).createAction())
        }
      );

      this.loadAllItem(0, this.amountValuePicked);
    }

  }

  handleListShow = () => this.isListShow = !this.isListShow;

  pickField = (e) => {
    this.page = 1;
    this.isListShow = false;
    this.amountValuePicked = +e.target.innerText;

    this.loadAllItem(0, this.amountValuePicked);
  }

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
    this.loadAllItem(counterValue, this.amountValuePicked);
  }

  ngOnInit() {
    this.notifyService.ajaxLoader.subscribe(res => this.loader = res)
    this.loadAllItem(0, this.amountValuePicked);
  }

}
