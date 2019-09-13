import { GET_PARTNER } from '../main.actions';
import { PartnerClass, Partner } from '../../models/partner.model';
import { ActionCreator } from '../action.creator';
import { AutoSuggestedPartner } from '../../services/partner.service';

export interface FindByPassPayload {
  number: string;
}

export class GetPartner extends ActionCreator {
  payload: PartnerClass;
  constructor(payload: PartnerClass) {
    super(GET_PARTNER);
    this.payload = payload;
  }
}

export const FIND_PARTNER_BY_PASSPORT = 'FIND_PARTNER_BY_PASSPORT';

export class FindByPasport extends ActionCreator {
  payload: FindByPassPayload;
  constructor(payload: FindByPassPayload) {
    super(FIND_PARTNER_BY_PASSPORT);
    this.payload = payload;
  }
}

export const FIND_PARTNER_BY_PASSPORT_SUCCESS =
  'FIND_PARTNER_BY_PASSPORT_SUCCESS';

export class FindByPasportSuccess extends ActionCreator {
  payload: any;
  constructor(payload: AutoSuggestedPartner[]) {
    super(FIND_PARTNER_BY_PASSPORT_SUCCESS);
    this.payload = payload;
  }
}
export const FIND_PARTNER_BY_PASSPORT_PICK = 'FIND_PARTNER_BY_PASSPORT_PICK';

export class FindByPasportPick extends ActionCreator {
  payload: AutoSuggestedPartner;
  constructor(partner: AutoSuggestedPartner) {
    super(FIND_PARTNER_BY_PASSPORT_PICK);
    this.payload = partner;
  }
}
export const FIND_PARTNER_BY_PASSPORT_CLEAR = 'FIND_PARTNER_BY_PASSPORT_CLEAR';

export class FindByPasportClear extends ActionCreator {
  payload: any;
  constructor() {
    super(FIND_PARTNER_BY_PASSPORT_CLEAR);
  }
}
export const CHECK_PARTNER = 'CHECK_PARTNER';

export class CheckPartner extends ActionCreator {
  payload;
  constructor(payload) {
    super(CHECK_PARTNER);
    this.payload = payload;
  }
}

export const CHECK_PARTNER_SUCCESS = 'CHECK_PARTNER_SUCCESS';

export class CheckPartnerSuccess extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(CHECK_PARTNER_SUCCESS);
    this.payload = payload;
  }
}

export const CHECK_PARTNER_ERROR = 'CHECK_PARTNER_ERROR';

export class CheckPartnerError extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(CHECK_PARTNER_ERROR);
    this.payload = payload;
  }
}

export const CHECK_PARTNER_NEW = 'CHECK_PARTNER_NEW';

export class CheckPartnerNew extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(CHECK_PARTNER_NEW);
    this.payload = payload;
  }
}
export const CHECK_PARTNER_NEW_SUCCESS = 'CHECK_PARTNER_NEW_SUCCESS';

export class CheckPartnerNewSuccess extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(CHECK_PARTNER_NEW_SUCCESS);
    this.payload = payload;
  }
}
export const CHECK_PARTNER_NEW_ERROR = 'CHECK_PARTNER_NEW_ERROR';

export class CheckPartnerNewError extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(CHECK_PARTNER_NEW_ERROR);
    this.payload = payload;
  }
}

export const CHECK_PARTNER_NEW_RESTORE = 'CHECK_PARTNER_NEW_RESTORE';

export class CheckPartnerNewRestore extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(CHECK_PARTNER_NEW_RESTORE);
    this.payload = payload;
  }
}

export const ADD_PARTNER_PHONE = 'ADD_PARTNER_PHONE';

export class AddPartnerPhone extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(ADD_PARTNER_PHONE);
    this.payload = payload;
  }
}
export const ADD_PARTNER_PHONE_SUCCESS = 'ADD_PARTNER_PHONE_SUCCESS';

export class AddPartnerPhoneSuccess extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(ADD_PARTNER_PHONE_SUCCESS);
    this.payload = payload;
  }
}

export const ADD_PARTNER_PHONE_ERROR = 'ADD_PARTNER_PHONE_ERROR';

export class AddPartnerPhoneError extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(ADD_PARTNER_PHONE_ERROR);
    this.payload = payload;
  }
}

export const ADD_PARTNER_PHONE_RESTORE = 'ADD_PARTNER_PHONE_RESTORE';

export class AddPartnerPhoneRestore extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(ADD_PARTNER_PHONE_RESTORE);
    this.payload = payload;
  }
}
//
export const VERIFY_PARTNER_PHONE = 'VERIFY_PARTNER_PHONE';

export class VerifyPartnerPhone extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(VERIFY_PARTNER_PHONE);
    this.payload = payload;
  }
}
export const VERIFY_PARTNER_PHONE_SUCCESS = 'VERIFY_PARTNER_PHONE_SUCCESS';

export class VerifyPartnerPhoneSuccess extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(VERIFY_PARTNER_PHONE_SUCCESS);
    this.payload = payload;
  }
}

export const VERIFY_PARTNER_PHONE_ERROR = 'VERIFY_PARTNER_PHONE_ERROR';

export class VerifyPartnerPhoneError extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(VERIFY_PARTNER_PHONE_ERROR);
    this.payload = payload;
  }
}

export const VERIFY_PARTNER_PHONE_RESTORE = 'VERIFY_PARTNER_PHONE_RESTORE';

export class VerifyPartnerPhoneRestore extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(VERIFY_PARTNER_PHONE_RESTORE);
    this.payload = payload;
  }
}

export const SAVE_VALID_PASSPORT_ID = 'SAVE_VALID_PASSPORT_ID';

export class SaveValidPassportId extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(SAVE_VALID_PASSPORT_ID);
    this.payload = payload;
  }
}

export const NOTIFY_INVALID_PASSPORT_ID = 'NOTIFY_INVALID_PASSPORT_ID';

export class NotifyInvalidPassportId extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(NOTIFY_INVALID_PASSPORT_ID);
    this.payload = payload;
  }
}
export const GET_NEW_PARTNER_INFO = 'GET_NEW_PARTNER_INFO';

export class GetNewPartnerInfo extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(GET_NEW_PARTNER_INFO);
    this.payload = payload;
  }
}
export const GET_NEW_PARTNER_INFO_SUCCESS = 'GET_NEW_PARTNER_INFO_SUCCESS';

export class GetNewPartnerInfoSuccess extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(GET_NEW_PARTNER_INFO_SUCCESS);
    this.payload = payload;
  }
}
export const GET_NEW_PARTNER_INFO_ERROR = 'GET_NEW_PARTNER_INFO_ERROR';

export class GetNewPartnerInfoError extends ActionCreator {
  payload: any;
  constructor(payload: any) {
    super(GET_NEW_PARTNER_INFO_ERROR);
    this.payload = payload;
  }
}

export const GET_PICKED_CARD = 'GET_PICKED_CARD';
export class GetPickedCard extends ActionCreator {
  payload : any;
  constructor(payload : any){
    super(GET_PICKED_CARD);
    this.payload = payload;
  }
}

export const GET_LOADED_CUTTERS = 'GET_LOADED_CUTTERS';

export class GetLoadedCutters extends ActionCreator {
  payload : any;
  constructor(payload : any){
    super(GET_LOADED_CUTTERS);
    this.payload = payload;
  }
}

export const GET_PICKED_CUTTER = 'GET_PICKED_CUTTER';

export class GetPickedCutter extends ActionCreator {
  payload : any;
  constructor(payload : any){
    super(GET_PICKED_CUTTER);
    this.payload = payload;
  }
}

export const GET_NOTIFICATION_LIST = 'GET_NOTIFICATION_LIST';

export class GetNotificationList extends ActionCreator {
  payload : any;
  constructor(payload : any){
    super(GET_NOTIFICATION_LIST);
    this.payload = payload;
  }
}

export const GET_NOTIFICATION_COUNT = 'GET_NOTIFICATION_COUNT';

export class GetNotificationCount extends ActionCreator {
  payload : any;
  constructor(payload : any) {
    super(GET_NOTIFICATION_COUNT);
    this.payload = payload;
  }
}

export const RESET_NUMBER_EXIST = 'RESET_NUMBER_EXIST';

export class ResetNumberExist extends ActionCreator {
  payload : any;
  constructor(payload : any){
    super(RESET_NUMBER_EXIST);
    this.payload = payload;
  }
}

export const LOAD_MENU_ITEMS = 'LOAD_MENU_ITEMS';

export class LoadMenuItems extends ActionCreator {
  payload : any;
  constructor(payload : any){
    super(LOAD_MENU_ITEMS);
    this.payload = payload;
  }
}

export const LOAD_RESPONSIBLE_STORAGE_ITEM = 'LOAD_RESPONSIBLE_STORAGE_ITEM';

export class LoadResponsibleItems extends ActionCreator {
  payload : any;
  constructor(payload : any){
    super(LOAD_RESPONSIBLE_STORAGE_ITEM);
    this.payload = payload;
  }
}

// notifications list

export const SAVE_PICKED_AMOUNT = 'SAVE_PICKED_AMOUNT';

export class SavePickedAmount extends ActionCreator {
  payload : any;
  constructor(payload : any){
    super(SAVE_PICKED_AMOUNT);
    this.payload = payload;
  }
}

export const SAVE_PICKED_AMOUNT_RESPONSIBLE = 'SAVE_PICKED_AMOUNT_RESPONSIBLE';

export class SavePickedAmountResponsible extends ActionCreator {
  payload : any;
  constructor(payload : any){
    super(SAVE_PICKED_AMOUNT_RESPONSIBLE);
    this.payload = payload;
  }
}

export const SAVE_PICKED_AFFILATE_ON_LOGIN = 'SAVE_PICKED_AFFILATE_ON_LOGIN';

export class SavePickedAffilateLogin extends ActionCreator {
  payload : any;
  constructor(payload : any){
    super(SAVE_PICKED_AFFILATE_ON_LOGIN);
    this.payload = payload;
  }
}

export type PartnerActions =
  | GetPartner
  | FindByPasport
  | FindByPasportSuccess
  | FindByPasportClear
  | FindByPasportPick
  | CheckPartner
  | CheckPartnerSuccess
  | CheckPartnerError
  | CheckPartnerNew
  | CheckPartnerNewSuccess
  | CheckPartnerNewError
  | CheckPartnerNewRestore
  | AddPartnerPhone
  | AddPartnerPhoneSuccess
  | AddPartnerPhoneError
  | AddPartnerPhoneRestore
  | VerifyPartnerPhone
  | VerifyPartnerPhoneSuccess
  | VerifyPartnerPhoneError
  | VerifyPartnerPhoneRestore
  | SaveValidPassportId
  | NotifyInvalidPassportId
  | GetNewPartnerInfo
  | GetNewPartnerInfoSuccess
  | GetNewPartnerInfoError;
