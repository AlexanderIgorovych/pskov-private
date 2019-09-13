import { PartnerClass } from '../../models/partner.model';
import { GET_PARTNER } from '../main.actions';
import { PartnerActions } from './partner.actions';
import * as partnerActions from './partner.actions';
import { AutoSuggestedPartner } from '../../services/partner.service';

function isLocal(passport: string) {
  const reg = /^[0-9]{2} [0-9]{6}/gm;
  const regRu = /^[0-9]{4} [0-9]{6}$/;

  if (reg.test(passport) || regRu.test(passport)) return true

  return false
}
export interface IPartnerState {
  notificationCount : number;
  notificationList : any;
  list: PartnerClass[];
  current: PartnerClass;
  autoSuggested: AutoSuggestedPartner[];
  pickedPartner: AutoSuggestedPartner;
  isPickedPartnerForbidden: boolean;
  createdPartnerId: number;
  isPhoneConfirmed: boolean;
  isCodeConfirmed: boolean;
  partnerIdentity: string;
  newPickedPartner: AutoSuggestedPartner;
  pickedCards : any;
  cutters: any;
  pickedCutter : any;
  phoneAlreadyExist : boolean;
  partnerAlreadyExist : boolean;
  menuItems : any;
  menuStorageItem : any;
  isAttemptFailed : number;
  notificationPickedAmount : number;
  responsiblePickedAmount  : number;
  pickedAffileateDefault : number;
}

export const INITIAL_PARTNER_STATE = {
  list: undefined,
  current: undefined,
  autoSuggested: undefined,
  pickedPartner: undefined,
  newPickedPartner: undefined,
  isPickedPartnerForbidden: undefined,
  createdPartnerId: undefined,
  isPhoneConfirmed: undefined,
  isCodeConfirmed: undefined,
  partnerIdentity: undefined,
  pickedCards : undefined,
  cutters : undefined,
  pickedCutter : undefined,
  notificationCount : undefined,
  notificationList : undefined,
  phoneAlreadyExist : undefined,
  partnerAlreadyExist : undefined,
  menuItems       : undefined,
  menuStorageItem : undefined,
  isAttemptFailed : 0,
  notificationPickedAmount : undefined,
  responsiblePickedAmount : undefined,
  pickedAffileateDefault : undefined
};

export function partnerReducer(
  state: IPartnerState = INITIAL_PARTNER_STATE,
  action: PartnerActions
): IPartnerState {
  switch (action.type) {

    case partnerActions.LOAD_MENU_ITEMS:
      return {
        ...state,
        menuItems : { ...action.payload }
      }

    case partnerActions.LOAD_RESPONSIBLE_STORAGE_ITEM:
      return {
        ...state,
        menuStorageItem : {
          ...action.payload
        }
      }

    case GET_PARTNER:
      return { ...state, current: action.payload };
    case partnerActions.FIND_PARTNER_BY_PASSPORT_SUCCESS:
      return {
        ...state,
        autoSuggested: action.payload
      };
    case partnerActions.FIND_PARTNER_BY_PASSPORT_CLEAR:
      return {
        ...state,
        autoSuggested: undefined,
        pickedPartner: undefined,
        isPickedPartnerForbidden: undefined
      };
    case partnerActions.FIND_PARTNER_BY_PASSPORT_PICK:
      return {
        ...state,
        pickedPartner: {
          ...action.payload,
          local: isLocal(action.payload.passport)
        }
      };
    case partnerActions.CHECK_PARTNER_SUCCESS:
      return {
        ...state,
        pickedPartner: {
          ...state.pickedPartner,
          cards: action.payload
        },
        isPickedPartnerForbidden: state.pickedPartner
          ? state.pickedPartner.blocked
          : false
      };
    case partnerActions.CHECK_PARTNER_ERROR:
      return {
        ...state,
        isPickedPartnerForbidden: true
      };

    case partnerActions.RESET_NUMBER_EXIST:
      return {
        ...state,
        phoneAlreadyExist : false
      }
    case partnerActions.CHECK_PARTNER_NEW_SUCCESS:
      return {
        ...state,
        createdPartnerId: action.payload.id,
        phoneAlreadyExist : false
      };
    case partnerActions.CHECK_PARTNER_NEW_ERROR:
      return {
        ...state,
        createdPartnerId: null,
        phoneAlreadyExist : action.payload.code === 23 ? true : false,
        partnerAlreadyExist : action.payload.code === 15 ? true : false,
      };
    case partnerActions.CHECK_PARTNER_NEW_RESTORE:
      return {
        ...state,
        createdPartnerId: undefined
      };
    case partnerActions.ADD_PARTNER_PHONE_SUCCESS:
      return {
        ...state,
        isPhoneConfirmed: true
      };
    case partnerActions.ADD_PARTNER_PHONE_ERROR:
      return {
        ...state,
        isPhoneConfirmed: false
      };
    case partnerActions.ADD_PARTNER_PHONE_RESTORE:
      return {
        ...state,
        isPhoneConfirmed: undefined,
        isAttemptFailed : 0
      };
    case partnerActions.VERIFY_PARTNER_PHONE_SUCCESS:
      return {
        ...state,
        isCodeConfirmed: true
      };
    case partnerActions.VERIFY_PARTNER_PHONE_ERROR:
      return {
        ...state,
        isCodeConfirmed: false,
        isAttemptFailed: state.isAttemptFailed + 1
      };
    case partnerActions.VERIFY_PARTNER_PHONE_RESTORE:
      return {
        ...state,
        isCodeConfirmed: undefined
      };
    case partnerActions.SAVE_VALID_PASSPORT_ID:
      return {
        ...state,
        partnerIdentity: action.payload
      };
    case partnerActions.NOTIFY_INVALID_PASSPORT_ID:
      return {
        ...state,
        partnerIdentity: undefined
      };
    case partnerActions.GET_NEW_PARTNER_INFO_SUCCESS:
      return {
        ...state,
        newPickedPartner: action.payload,
        pickedPartner: {
          ...action.payload,
          local : isLocal(action.payload.passport)
        },
        isPickedPartnerForbidden: false
      };

    case partnerActions.GET_PICKED_CARD:
      return {
        ...state,
        pickedCards : action.payload
      }

    case partnerActions.GET_LOADED_CUTTERS:
      return {
        ...state,
        cutters: action.payload
      }

   case partnerActions.GET_PICKED_CUTTER:
     return {
       ...state,
       pickedCutter : action.payload
     }

   case partnerActions.GET_NOTIFICATION_COUNT:
    return {
      ...state,
      notificationCount : action.payload
    }

  case partnerActions.GET_NOTIFICATION_LIST:
    return {
      ...state,
      notificationList : action.payload
    }

  case partnerActions.SAVE_PICKED_AMOUNT_RESPONSIBLE:
    return {
      ...state,
      responsiblePickedAmount : action.payload
    }

  case partnerActions.SAVE_PICKED_AMOUNT:
    return {
      ...state,
      notificationPickedAmount : action.payload
    }

  case partnerActions.SAVE_PICKED_AFFILATE_ON_LOGIN:
    return {
      ...state,
      pickedAffileateDefault : action.payload
    }
  }
  return state;
}
