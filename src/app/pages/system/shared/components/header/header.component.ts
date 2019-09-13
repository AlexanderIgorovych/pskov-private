import { Component, OnDestroy, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../../../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { UserQuery } from '../../../../../core/store/user/user.query';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ModalMenuComponent } from '../../modules/dialog/components/modal-menu/modal-menu.component';
import { ModalLogoutComponent } from '../../modules/dialog/components/modal-logout/modal-logout.component';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../../../core/store/rootStore';
import { NavigationActions } from '../../../../../core/store/navigation/navigation.actions';
import { NavigationQuery } from '../../../../../core/store/navigation/navigation.query';
import { ModalCallComponent } from '../../modules/dialog/components/modal-call/modal-call.component';
import { UserActions } from '../../../../../core/store/user/user.actions';
import { ApiService } from '../../../../../core/http/api.service';
import { pluck } from 'rxjs/operators';
import { GetNotificationCount } from '../../../../../core/store/partner/partner.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  title = 'Имя пользователя';
  isNavigatedOnNotification: boolean;
  isActiveMobile : boolean = false;


  @select((s : IAppState) => s.partner.notificationCount) partner;

  notificationCount : any;

  @Output() headerSwitch = new EventEmitter();

  @Input() menuBack;

  public s1: Subscription;
  public s2: Subscription;
  public s3: Subscription;
  public s4: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private userQuery: UserQuery,
    private apiService: ApiService,
    private dialog: MatDialog,
    private ngRedux: NgRedux<IAppState>,
    private navigationActions: NavigationActions,
    private navigationQuery: NavigationQuery,
    private userActions: UserActions
  ) {}

  ngOnInit() {

    // Load Full Name from Redux Store
    this.s1 = this.userQuery.getFullName().subscribe(name => {
      this.title = name ? name : this.title;
    });
    // Load amount of notification
    this.s3 = this.apiService.get('notifications.count').pipe(
      pluck('data', 'count')
    ).subscribe(
      res => {
        this.notificationCount = res;
        this.ngRedux.dispatch(new GetNotificationCount(res).createAction())
      }
    );

    this.s4 = this.partner.subscribe(res => this.notificationCount = res);

    // Load notification bubble
    this.s2 = this.navigationQuery
      .isNavigatedToNotification()
      .subscribe(res => (this.isNavigatedOnNotification = res));
  }

  switchMenu = () => {
    this.isActiveMobile = !this.isActiveMobile;
    this.headerSwitch.emit(this.isActiveMobile);
  };

  ngOnDestroy() {
    this.s1.unsubscribe();
    this.s2.unsubscribe();
    this.s3.unsubscribe();
    this.s4.unsubscribe();
  }

  onNotificationClick() {
    this.ngRedux.dispatch(this.navigationActions.toggleNotification());
  }

  onLogOut() {

    // Open checkout modal
    const dialogRef = this.dialog.open(ModalLogoutComponent, {
      data: { isLogout: false }
    });

    // Make logout and redirect after confirmation!
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/']);
      }
    });
  }

  linkDetector(key){

    const links = [
      'responsible-storage',
      'order-psa',
      'shipment-customer',
      'shipment-customer',
      'shipment-customer',
      'shipment-customer',
      'shipment-goods',
      'shipment-goods',
      'invertory'
    ]

    return links[key];
  };

  openDialog(): void {

    const dialogRef = this.dialog.open(ModalMenuComponent, {
      data: { name: '', animal: '' }
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result || result === 0) {
        // detect url
        const url = this.linkDetector(result);
        result !== 8
               ? this.router.navigate(['/system', url, result])
               : this.router.navigate(['/system', url])

      }
    });
  }

  openCallDialog() {

    const dialogRef = this.dialog.open(ModalCallComponent);

    // Open dialog modal for ordering call
    dialogRef.componentInstance.canceled.subscribe(_ => {
      dialogRef.close();
    });

    // Close modal
    dialogRef.componentInstance.requestedCall.subscribe(_ => {
      this.ngRedux.dispatch(this.userActions.requestCall());
      dialogRef.close();
    });

  }
}
