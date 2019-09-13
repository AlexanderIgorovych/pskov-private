import { ActionCreator } from '../action.creator';

export const FIND_CAR_BY_NUMBER = 'FIND_CAR_BY_NUMBER';

export class FindCarByNumber extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(FIND_CAR_BY_NUMBER);
    this.payload = payload;
  }
}
export const FIND_CAR_BY_NUMBER_SUCCESS = 'FIND_CAR_BY_NUMBER_SUCCESS';

export class FindCarByNumberSuccess extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(FIND_CAR_BY_NUMBER_SUCCESS);
    this.payload = payload;
  }
}
export const FIND_CAR_BY_NUMBER_ERROR = 'FIND_CAR_BY_NUMBER_ERROR';

export class FindCarByNumberError extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(FIND_CAR_BY_NUMBER_ERROR);
    this.payload = payload;
  }
}

export const PICK_CAR = 'PICK_CAR';

export class PickCar extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(PICK_CAR);
    this.payload = payload;
  }
}
export const FIND_CAR_BY_NUMBER_RESTORE = 'FIND_CAR_BY_NUMBER_RESTORE';

export class FindCarByNumberRestore extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(FIND_CAR_BY_NUMBER_RESTORE);
    this.payload = payload;
  }
}
export const CHECK_CAR = 'CHECK_CAR';

export class CheckCar extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(CHECK_CAR);
    this.payload = payload;
  }
}

export const FIND_TRAILER_BY_NUMBER = 'FIND_TRAILER_BY_NUMBER';

export class FindTrailerByNumber extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(FIND_TRAILER_BY_NUMBER);
    this.payload = payload;
  }
}
export const FIND_TRAILER_BY_NUMBER_SUCCESS = 'FIND_TRAILER_BY_NUMBER_SUCCESS';

export class FindTrailerByNumberSuccess extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(FIND_TRAILER_BY_NUMBER_SUCCESS);
    this.payload = payload;
  }
}
export const FIND_TRAILER_BY_NUMBER_ERROR = 'FIND_TRAILER_BY_NUMBER_ERROR';

export class FindTrailerByNumberError extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(FIND_TRAILER_BY_NUMBER_ERROR);
    this.payload = payload;
  }
}

export const FIND_TRAILER_BY_NUMBER_RESTORE = 'FIND_TRAILER_BY_NUMBER_RESTORE';

export class FindTrailerByNumberRestore extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(FIND_TRAILER_BY_NUMBER_RESTORE);
    this.payload = payload;
  }
}

export const PICK_TRAILER = 'PICK_TRAILER';

export class PickTrailer extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(PICK_TRAILER);
    this.payload = payload;
  }
}
export const CHECK_TRAILER = 'CHECK_TRAILER';

export class CheckTrailer extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(CHECK_TRAILER);
    this.payload = payload;
  }
}

export type CarActions =
  | FindCarByNumber
  | FindCarByNumberSuccess
  | FindCarByNumberError
  | FindCarByNumberRestore
  | CheckTrailer
  | FindTrailerByNumber
  | FindTrailerByNumberSuccess
  | FindTrailerByNumberError
  | FindTrailerByNumberRestore
  | PickTrailer
  | CheckTrailer;
