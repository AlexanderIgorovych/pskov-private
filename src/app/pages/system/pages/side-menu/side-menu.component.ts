import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { Router } from '@angular/router';
import { UserQuery } from '../../../../core/store/user/user.query';
import { ApiService } from '../../../../core/http/api.service';
import { MatDialog } from '@angular/material';
import { NgRedux } from '@angular-redux/store';
import { NavigationActions } from '../../../../core/store/navigation/navigation.actions';
import { NavigationQuery } from '../../../../core/store/navigation/navigation.query';
import { UserActions } from '../../../../core/store/user/user.actions';
import { IAppState } from '../../../../core/store/rootStore';
import { ModalLogoutComponent } from '../../shared/modules/dialog/components/modal-logout/modal-logout.component';
import { ModalMenuComponent } from '../../shared/modules/dialog/components/modal-menu/modal-menu.component';
import { ModalCallComponent } from '../../shared/modules/dialog/components/modal-call/modal-call.component';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {

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

  @Input() classValue;

  @Output() closeMenu = new EventEmitter();

  ngOnInit() {
  }

  openDialog(): void {

    const dialogRef = this.dialog.open(ModalMenuComponent, {
      data: { name: '', animal: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/system', 'order-psa', '1']);
      }
    });

    this.closeMenu.emit();
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

    this.closeMenu.emit();
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

    this.closeMenu.emit();

  }
}
