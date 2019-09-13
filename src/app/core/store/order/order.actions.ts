import {ActionWithPayload} from '../../models/interfaces/common';
import {CHANGE_ORDER} from '../main.actions';

export class OrderActions {
  constructor() {}

  changeOrderType(type: number): ActionWithPayload<any> {
    return {type: CHANGE_ORDER, payload: { type }};
  }
}
