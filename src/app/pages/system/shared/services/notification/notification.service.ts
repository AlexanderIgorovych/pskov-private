import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/http/api.service';
import { pluck } from 'rxjs/operators';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../../../core/store/rootStore';
import { GetNotificationList, SavePickedAmount } from '../../../../../core/store/partner/partner.actions';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  ajaxLoader = new BehaviorSubject(false)

  @select((s : IAppState) => s.partner.notificationList) notifyList;

  constructor(private apiService : ApiService, private ngRedux : NgRedux<IAppState>) { }

  public listOfNotification = new BehaviorSubject(null);

  notificationWasSeen = (data) => {
    this.apiService.put('notifications.seen' , { ids: data })
  }

  getNotificationList = (ofs = 0, amount) => {
    this.ngRedux.dispatch(new SavePickedAmount(amount).createAction())
    this.ajaxLoader.next(true);
    this.apiService.get(`notifications&?offset=${ofs}&amount=${amount}`).pipe(
      pluck('data')
    ).subscribe(
      res => {
        this.ajaxLoader.next(false)
        this.ngRedux.dispatch(new GetNotificationList(res).createAction());
        return this.getNotifyStore();
    },
      err => {
        this.ajaxLoader.next(true)
      }
    )
  }

  getNotifyStore = () => {
    this.notifyList.subscribe(res => {
      this.listOfNotification.next(res);
    })
  }
}
