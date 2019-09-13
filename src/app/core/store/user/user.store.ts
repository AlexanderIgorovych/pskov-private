import {
  LOGIN_SUCCESS,
  LOGOUT,
  RESET_USER,
  CHECK_ONLINE,
  LOGIN_FAILED,
  LOGIN
} from '../main.actions';
import { ActionWithPayload } from '../../models/interfaces/common';

export interface IUserState {
  isAuth: boolean;
  token?: string;
  name?: string;
  online: boolean;
  isWrongError : boolean;
}

export const AUTH_INITIAL_STATE: IUserState = {
  isAuth: false,
  online: true,
  isWrongError : false
};

export function userReducer(
  state: IUserState = AUTH_INITIAL_STATE,
  action: ActionWithPayload<any>
): IUserState {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isWrongError : false
      }

    case LOGIN_SUCCESS:
      return setUser(state, action);

    case LOGIN_FAILED:
      return {
        ...state,
        isWrongError : action.payload === 13 ? true : false
      }

    case LOGOUT: {
      return unsetUser(state, action);
    }
    case RESET_USER: {
      return setUser(state, action);
    }
    case CHECK_ONLINE:
      return { ...state, online: action.payload };
  }
  return state;
}

function setUser(state, action) {
  return {
    ...state,
    ...{ isAuth: true, ...action.payload },
    isWrongError : false
   };
}

function unsetUser(state, action) {
  return { isAuth: false, online: state.online, isWrongError : false };
}
