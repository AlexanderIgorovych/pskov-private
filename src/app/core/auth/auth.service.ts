import { Injectable, OnInit } from '@angular/core';
import { IAppState, INITIAL_STATE } from '../store/rootStore';

import { Router } from '@angular/router';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  WRONG_CREDENTIALS
} from '../store/main.actions';
import { TokenService } from './token.service';
import { ApiService } from '../http/api.service';
import { AuthRequest, AuthResponse } from './authBody.type';
import { Observable } from 'rxjs';
import { User } from '../../shared/entitys/user.entity';
import { ConfigService } from '../config.service';
import { pluck } from 'rxjs/operators';
import { UserActions } from '../store/user/user.actions';
import { NgRedux, select } from '@angular-redux/store';
import { UserQuery } from '../store/user/user.query';
import { SavePickedAffilateLogin } from '../store/partner/partner.actions';

@Injectable()
export class AuthService {
  private url = 'auth';

  isError : boolean = false;

  constructor(
    private apiService: ApiService,
    private ngRedux: NgRedux<IAppState>,
    private configService: ConfigService,
    private tokenService: TokenService,
    private router: Router,
    private userActions: UserActions,
    private userQuery: UserQuery
  ) {}

  getIsError(){
    return this.isError
  }

  login(body: AuthRequest): void {
    this.ngRedux.dispatch(new SavePickedAffilateLogin(body.affiliate_id).createAction())
    this.ngRedux.dispatch(this.userActions.login());
    this.apiService
      .post<AuthResponse>(this.url, body)
      .pipe(pluck('data'))
      .subscribe(
        user => {
          this.ngRedux.dispatch(this.userActions.loginSuccess(user));
          localStorage.setItem(
            this.configService.credentials,
            JSON.stringify(user)
          );
          this.router.navigate(['system']);
          this.isError = false;
        },
        (error: any) => {
          const errorPayload = { ...error };
          const errorCode = errorPayload.response.data.error.code;

          this.ngRedux.dispatch(this.userActions.loginFailed(errorCode));
          this.isError = true
        }
      );
  }

  logout() {
    localStorage.removeItem(this.configService.credentials);
    this.ngRedux.dispatch(this.userActions.logout());
  }

  isLoggedIn() {
    return this.userQuery.getAuth();
  }

  restartUserSession() {
    const user = JSON.parse(
      localStorage.getItem(this.configService.credentials)
    );
    if (user) {
      this.ngRedux.dispatch(this.userActions.reset(user));
    }
  }
}
