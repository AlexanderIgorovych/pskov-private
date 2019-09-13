import {Payment} from '../../models/payment.model';
import {Documents} from '../../models/document.model';
import {CHANGE_ORDER, CLEAR_ORDER} from '../main.actions';
import {ActionWithPayload} from '../../models/interfaces/common';

export interface IOrderState {
  id?: number;
  type: number | null;
  partner_id: number | null;
  car_id: number | null;
  trailer_id: number | null;
  payment: Payment | null;
  documents: Documents | null;
}

export const ORDER_INITIAL_STATE: IOrderState = {
  type: null,
  partner_id: null,
  car_id: null,
  trailer_id: null,
  payment: null,
  documents: null
};

export function orderReducer(
  state: IOrderState = ORDER_INITIAL_STATE,
  action: ActionWithPayload<any>
): IOrderState {
  switch (action.type) {
    case CLEAR_ORDER:
      return setStateToInit();
    case CHANGE_ORDER:
      return changeOrder(state, action.payload);
  }
  return state;
}

function setStateToInit() {
  return { ...ORDER_INITIAL_STATE };
}

function changeOrder(state: IOrderState, data) {
  return { ...state, ...data };
}
