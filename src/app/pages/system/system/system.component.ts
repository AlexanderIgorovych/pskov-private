import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { interval, Observable } from 'rxjs';
import { isOnline, unsubscribeAll } from '../../../core/untils';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../core/store/rootStore';
import { UserActions } from '../../../core/store/user/user.actions';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss']
})
export class SystemComponent implements OnInit, OnDestroy {
  constructor(
    private authService: AuthService,
    private ngRedux: NgRedux<IAppState>
  ) {}
  internetConnectionCheckPing = 6500;
  subscribtions = [];

  sideMenu : boolean = false;
  // Show / Hide Side Menu
  sideOpenMenu = () => this.sideMenu = !this.sideMenu;

  @select((s: IAppState) => s.user.online) online: Observable<boolean>;
  checkConnection() {
    return interval(this.internetConnectionCheckPing).subscribe(res => {
      this.ngRedux.dispatch(UserActions.checkOnline(isOnline()));
    });
  }

  ngOnInit() {
    const checkConnection = this.checkConnection();
    this.subscribtions.push(checkConnection);
    this.authService.restartUserSession();
  }
  ngOnDestroy() {
    unsubscribeAll(this.subscribtions);
  }
}
