import {TOGGLE_NOTIFICATION} from '../main.actions';

export interface INavigationState {
  path: string;
  header_menu: number;
  notification: boolean;
}

export const NAVIGATION_INITIAL_STATE: INavigationState = {
  path: '',
  header_menu: 0,
  notification: false
};

export function navigationReduces(
  state: INavigationState = NAVIGATION_INITIAL_STATE,
  action
): INavigationState {
  switch (action.type) {
    case TOGGLE_NOTIFICATION:
      return toggleNotification(state, action);
  }
  return state;
}

function toggleNotification(state: INavigationState, action) {
  return { ...state, notification: !state.notification };
}
