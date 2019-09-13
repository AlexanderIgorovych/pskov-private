import * as carActions from './add-car.actions';

export interface IAddCarState {
  autoSuggested: number;
  pickedCarMake: any;
}

export const INITIAL_ADD_CAR_STATE: IAddCarState = {
  autoSuggested: undefined,
  pickedCarMake: undefined
};

export function addCarReducer(
  state: IAddCarState = INITIAL_ADD_CAR_STATE,
  action: any
): IAddCarState {
  switch (action.type) {
    case carActions.FIND_CAR_MAKE_BY_NUMBER_SUCCESS:
      return {
        ...state,
        autoSuggested: action.payload
      };
    case carActions.PICK_CAR_MAKE:
      return {
        ...state,
        pickedCarMake: action.payload,
        autoSuggested: undefined
      };
    case carActions.FIND_CAR_MAKE_BY_NUMBER_RESTORE:
      return {
        ...state,
        autoSuggested: undefined,
        pickedCarMake: undefined
      };
  }
  return state;
}
