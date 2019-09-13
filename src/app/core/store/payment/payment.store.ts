import * as paymentActions from './payment.actions';
import { paymentType } from '../../services/order.service';

export interface SavedDocuments {
  requisites: string[];
  cardFace: string[];
}
export interface IPaymentState {
  paymentType: paymentType;
  documents: SavedDocuments;
  documentsConfirmed: number;
  paymentVerification : boolean,
  orderDocs : any;
  newNumberQiwi : number
  psaDocument : any;

  client_number : number;
  partner_card  : number;
  client_card : number
}

export const INITIAL_PAYMENT_STATE: IPaymentState = {
  paymentType: undefined,
  documents: undefined,
  documentsConfirmed: 0,
  paymentVerification : false,
  orderDocs : undefined,
  newNumberQiwi : undefined,
  psaDocument : undefined,

  client_number : undefined,
  partner_card  : undefined,
  client_card : undefined

};

export function paymentReducer(
  state: IPaymentState = INITIAL_PAYMENT_STATE,
  action: any
): IPaymentState {
  switch (action.type) {

    case paymentActions.SAVE_CLIENT_CARD:
      return {
        ...state,
        client_card : action.payload
      }

    case paymentActions.PICK_PAYMENT_TYPE:
      return {
        ...state,
        paymentType: action.payload
      };

    case paymentActions.SAVE_PAYMENT_DOCUMENTS:
      return {
        ...state,
        documentsConfirmed: 1,
        documents: action.payload
      };

    case paymentActions.VERIFICATION_RESULTS:
      return {
        ...state,
        paymentVerification : action.payload
      }

    case paymentActions.STATEMENT_DOCUMENT_SAVED:
      return {
        ...state,
        orderDocs : action.payload
      }

    case paymentActions.SAVE_CLIENT_PHONE:
      return {
        ...state,
        client_number : action.payload
      }

    case paymentActions.SAVE_PARTNER_CARD:
      return {
        ...state,
        partner_card : action.payload
      }

    case paymentActions.ON_ADDED_NEW_QIWI_NUMBER:
      return {
        ...state,
        newNumberQiwi : action.payload
      }

    case paymentActions.PSA_LOADED_SUCCESS:
      return {
        ...state,
        psaDocument: action.payload
      }
  }
  return state;
}
