import { combineReducers } from 'redux';
import { IUserState, AUTH_INITIAL_STATE, userReducer } from './user/user.store';
import {
  IPropertyState,
  PROPERTY_INITIAL_STATE,
  propertyReducer
} from './property/property.store';

import {
  INavigationState,
  NAVIGATION_INITIAL_STATE,
  navigationReduces
} from './navigation/navigation.store';

import {
  IOrderState,
  ORDER_INITIAL_STATE,
  orderReducer
} from './order/order.store';

import {
  INITIAL_PARTNER_STATE,
  IPartnerState,
  partnerReducer
} from './partner/partner.store';

import {
  INITIAL_ADD_PARTNER_STATE,
  IAddPartnerState,
  addPartnerReducer
} from './add-partner/add-partner.store';

import { ICarState,
  INITIAL_CAR_STATE,
  carReducer
} from './car/car.store';

import {
  IAddCarState,
  INITIAL_ADD_CAR_STATE,
  addCarReducer
} from './add-car/add-car.store';

import {
  IAddDocumentsState,
  INITIAL_ADD_DOCUMENTS_STATE,
  addDocumentsReducer
} from './add-documents/add-documents.store';

import {
  IPaymentState,
  INITIAL_PAYMENT_STATE,
  paymentReducer
} from './payment/payment.store';

import {
  IWeighState,
  INITIAL_WEIGHT_STATE,
  weighReducer }
  from './weigh/weigh.store';

import {
  INITIAL_RESPONSE_SAVE_STATE,
  IResponsibleStore,
  responseSaveReducer
} from './responsible-save/responsible-save.store';



export interface IAppState {
  user: IUserState;
  property: IPropertyState;
  navigation: INavigationState;
  order: IOrderState;
  partner: IPartnerState;
  addPartner: IAddPartnerState;
  car: ICarState;
  addCar: IAddCarState;
  addDocuments: IAddDocumentsState;
  payment: IPaymentState;
  weight : IWeighState,
  responsibleSave : IResponsibleStore
}

export const INITIAL_STATE: IAppState = {
  user: AUTH_INITIAL_STATE,
  property: PROPERTY_INITIAL_STATE,
  navigation: NAVIGATION_INITIAL_STATE,
  order: ORDER_INITIAL_STATE,
  partner: INITIAL_PARTNER_STATE,
  addPartner: INITIAL_ADD_PARTNER_STATE,
  car: INITIAL_CAR_STATE,
  addCar: INITIAL_ADD_CAR_STATE,
  addDocuments: INITIAL_ADD_DOCUMENTS_STATE,
  payment: INITIAL_PAYMENT_STATE,
  weight : INITIAL_WEIGHT_STATE,
  responsibleSave: INITIAL_RESPONSE_SAVE_STATE
};

export const rootReducer = combineReducers<IAppState>({
  user: userReducer,
  property: propertyReducer,
  navigation: navigationReduces,
  order: orderReducer,
  partner: partnerReducer,
  addPartner: addPartnerReducer,
  car: carReducer,
  addCar: addCarReducer,
  addDocuments: addDocumentsReducer,
  payment: paymentReducer,
  weight: weighReducer,
  responsibleSave : responseSaveReducer
});
