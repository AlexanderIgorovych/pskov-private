import { ActionCreator } from '../action.creator';
import { NewCarRaw } from '../../services/add-car.service';

export const FIND_CAR_MAKE_BY_NUMBER = 'FIND_CAR_MAKE_BY_NUMBER';

export class FindCarMakeByNumber extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(FIND_CAR_MAKE_BY_NUMBER);
    this.payload = payload;
  }
}
export const FIND_CAR_MAKE_BY_NUMBER_SUCCESS =
  'FIND_CAR_MAKE_BY_NUMBER_SUCCESS';

export class FindCarMakeByNumberSuccess extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(FIND_CAR_MAKE_BY_NUMBER_SUCCESS);
    this.payload = payload;
  }
}
export const FIND_CAR_MAKE_BY_NUMBER_ERROR = 'FIND_CAR_MAKE_BY_NUMBER_ERROR';

export class FindCarMakeByNumberError extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(FIND_CAR_MAKE_BY_NUMBER_ERROR);
    this.payload = payload;
  }
}

export const PICK_CAR_MAKE = 'PICK_CAR_MAKE';

export class PickCarMake extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(PICK_CAR_MAKE);
    this.payload = payload;
  }
}
export const FIND_CAR_MAKE_BY_NUMBER_RESTORE =
  'FIND_CAR_MAKE_BY_NUMBER_RESTORE';

export class FindCarMakeByNumberRestore extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(FIND_CAR_MAKE_BY_NUMBER_RESTORE);
    this.payload = payload;
  }
}
// ====
export const CREATE_CAR = 'CREATE_CAR';

export class CreateCar extends ActionCreator {
  payload: NewCarRaw;
  constructor(payload: NewCarRaw) {
    super(CREATE_CAR);
    this.payload = payload;
  }
}
export const CREATE_CAR_SUCCESS = 'CREATE_CAR_SUCCESS';

export class CreateCarSuccess extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(CREATE_CAR_SUCCESS);
    this.payload = payload;
  }
}
export const CREATE_CAR_ERROR = 'CREATE_CAR_ERROR';

export class CreateCarError extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(CREATE_CAR_ERROR);
    this.payload = payload;
  }
}

export type CarActions =
  | FindCarMakeByNumber
  | FindCarMakeByNumberSuccess
  | FindCarMakeByNumberError
  | FindCarMakeByNumberRestore
  | PickCarMake;
