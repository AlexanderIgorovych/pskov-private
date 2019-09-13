import {Injectable} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationQuery {
  @select(s => s.navigation.notification)
  private notification: Observable<boolean>;


  // Exports
  isNavigatedToNotification() {
    return this.notification;
  }
}
