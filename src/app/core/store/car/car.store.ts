import { PartnerClass } from '../../models/partner.model';
import { GET_PARTNER } from '../main.actions';
import { CarActions } from './car.actions';
import * as carActions from './car.actions';
import { AutoSuggestedCar } from '../../services/car.service';

export interface ICarState {
  autoSuggested: AutoSuggestedCar[];
  pickedCar: AutoSuggestedCar;
  isPickedCarForbidden: boolean;
  autoSuggestedTrailers: AutoSuggestedCar[];
  autoSuggestedTrailerPicked: AutoSuggestedCar[];
  isPickedTrailerForbidden: boolean;
}

export const INITIAL_CAR_STATE = {
  autoSuggested: undefined,
  pickedCar: undefined,
  isPickedCarForbidden: undefined,
  autoSuggestedTrailers: undefined,
  autoSuggestedTrailerPicked: undefined,
  isPickedTrailerForbidden: undefined
};

export function carReducer(
  state: ICarState = INITIAL_CAR_STATE,
  action: CarActions
): ICarState {
  switch (action.type) {
    case carActions.FIND_CAR_BY_NUMBER_SUCCESS:
      return {
        ...state,
        autoSuggested: action.payload
      };
    case carActions.FIND_CAR_BY_NUMBER_ERROR:
      return {
        ...state
      };
    case carActions.FIND_CAR_BY_NUMBER_RESTORE:
      return {
        ...state,
        autoSuggested: undefined,
        pickedCar: undefined,
        isPickedCarForbidden: undefined
      };
    case carActions.PICK_CAR:
      return {
        ...state,
        autoSuggested: undefined,
        pickedCar: action.payload
      };
    case carActions.FIND_TRAILER_BY_NUMBER_SUCCESS:
      return {
        ...state,
        autoSuggestedTrailers: action.payload
      };
    case carActions.FIND_TRAILER_BY_NUMBER_ERROR:
      return {
        ...state
      };
    case carActions.FIND_TRAILER_BY_NUMBER_RESTORE:
      return {
        ...state,
        autoSuggestedTrailers: undefined,
        autoSuggestedTrailerPicked: undefined,
        isPickedTrailerForbidden: undefined
      };
    case carActions.PICK_TRAILER:
      return {
        ...state,
        autoSuggestedTrailers: undefined,
        autoSuggestedTrailerPicked: action.payload
      };
    case carActions.CHECK_CAR:
      return {
        ...state,
        isPickedCarForbidden: action.payload
      };
    case carActions.CHECK_TRAILER:
      return {
        ...state,
        isPickedTrailerForbidden: action.payload
      };
  }
  return state;
}
