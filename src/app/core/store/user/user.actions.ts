import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT,
  WRONG_CREDENTIALS,
  RESET_USER,
  CHECK_ONLINE,
  REQUEST_CALL
} from '../main.actions';

export class UserActions {
  constructor() {}

  static checkOnline(status: boolean) {
    return { type: CHECK_ONLINE, payload: status };
  }

  login() {
    return { type: LOGIN };
  }

  loginSuccess(user: any) {
    return { type: LOGIN_SUCCESS, payload: user };
  }

  loginFailed(error) {
    return { type: LOGIN_FAILED, payload: error };
  }

  logout() {
    return { type: LOGOUT };
  }

  reset(user: any) {
    return { type: RESET_USER, payload: user };
  }
  requestCall() {
    return { type: REQUEST_CALL };
  }
}
