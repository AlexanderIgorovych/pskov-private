import { ActionCreator } from '../action.creator';
import { RawDocumentsData } from '../../services/payment.service';

export const PICK_PAYMENT_TYPE = 'PICK_PAYMENT_TYPE';

export class PickPaymentType extends ActionCreator {
  payload: number;
  constructor(payload: number) {
    super(PICK_PAYMENT_TYPE);
    this.payload = payload;
  }
}
export const SAVE_PAYMENT_DOCUMENTS = 'SAVE_PAYMENT_DOCUMENTS';

export class SavePaymentDocuments extends ActionCreator {
  payload: RawDocumentsData;
  constructor(payload: RawDocumentsData) {
    super(SAVE_PAYMENT_DOCUMENTS);
    this.payload = payload;
  }
}
export const SAVE_PAYMENT_DOCUMENTS_SUCCESS = 'SAVE_PAYMENT_DOCUMENTS_SUCCESS';

export class SavePaymentDocumentsSuccess extends ActionCreator {
  payload: any;
  constructor(payload) {
    super(SAVE_PAYMENT_DOCUMENTS_SUCCESS);
    this.payload = payload;
  }
}
export const SAVE_PAYMENT_DOCUMENTS_ERROR = 'SAVE_PAYMENT_DOCUMENTS_ERROR';

export class SavePaymentDocumentsError extends ActionCreator {
  payload: any;
  constructor(payload) {
    super(SAVE_PAYMENT_DOCUMENTS_ERROR);
    this.payload = payload;
  }
}

export const SAVE_PARTNER_CARD = 'SAVE_PARTNER_CARD';

export class SavePartnerCard extends ActionCreator {
  payload;
  constructor(payload) {
    super(SAVE_PARTNER_CARD);
    this.payload = payload;
  }
}

export const SAVE_PARTNER_CARD_SUCCESS = 'SAVE_PARTNER_CARD_SUCCESS';

export class SavePartnerCardSuccess extends ActionCreator {
  payload;
  constructor(payload) {
    super(SAVE_PARTNER_CARD_SUCCESS);
    this.payload = payload;
  }
}

export const SAVE_PARTNER_CARD_ERROR = 'SAVE_PARTNER_CARD_ERROR';

export class SavePartnerCardError extends ActionCreator {
  payload;
  constructor(payload) {
    super(SAVE_PARTNER_CARD_ERROR);
    this.payload = payload;
  }
}

export const VERIFICATION_RESULTS = 'VERIFICATION_RESULTS';

export class VerificationResult extends ActionCreator {
  payload;
  constructor(payload){
    super(VERIFICATION_RESULTS);
    this.payload = payload;
  }
}

export const STATEMENT_DOCUMENT_SAVED = 'STATEMENT_DOCUMENT_SAVED';

export class SaveOrderDocuments extends ActionCreator {
  payload;
  constructor(payload){
    super(STATEMENT_DOCUMENT_SAVED);
    this.payload = payload;
  }
}

export const ON_ADDED_NEW_QIWI_NUMBER = 'ON_ADDED_NEW_QIWI_NUMBER';

export class AddedNumberQiwi extends ActionCreator {
  payload;
  constructor(payload){
    super(ON_ADDED_NEW_QIWI_NUMBER);
    this.payload = payload;
  }
}

export const SAVE_CLIENT_PHONE = 'SAVE_CLIENT_PHONE';

export class SaveNumberClient extends ActionCreator {
  payload;

  constructor(payload){
    super(SAVE_CLIENT_PHONE);
    this.payload = payload;
  }
}

export const PSA_LOADED_SUCCESS = 'PSA_LOADED_SUCCESS';

export class SavedPsaDocuments extends ActionCreator {
  payload;
  constructor(payload){
    super(PSA_LOADED_SUCCESS);
    this.payload = payload;
  }
}

export const SAVE_CLIENT_CARD_QIWI = 'SAVE_CLIENT_CARD_QIWI';


export class SaveClientCardQiwi extends ActionCreator {
  payload;
  constructor(payload){
    super(SAVE_CLIENT_CARD_QIWI);
    this.payload = payload;
  }
}

export const SAVE_CLIENT_CARD = 'SAVE_CLIENT_CARD';


export class SaveClientCard extends ActionCreator {
  payload;
  constructor(payload){
    super(SAVE_CLIENT_CARD);
    this.payload = payload;
  }
}

export type PaymentActions =
  | PickPaymentType
  | SavePaymentDocuments
  | SavePaymentDocumentsSuccess
  | SavePaymentDocumentsError
  | SavePartnerCard
  | SavePartnerCardSuccess
  | SavePartnerCardError;
