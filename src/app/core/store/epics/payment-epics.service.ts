import { Injectable } from '@angular/core';
import { combineEpics, ActionsObservable, ofType } from 'redux-observable';
import {
  SAVE_PAYMENT_DOCUMENTS,
  SavePaymentDocumentsSuccess,
  SAVE_PARTNER_CARD,
  SavePartnerCardSuccess
} from '../payment/payment.actions';
import { mergeMap, pluck, map } from 'rxjs/operators';
import { PaymentService } from '../../services/payment.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentEpicsService {
  paymentEpics;
  constructor(private service: PaymentService) {
    this.paymentEpics = combineEpics(this.sendDocuments, this.addNewCard);
  }

  sendDocuments = (action$: ActionsObservable<any>) => {
    return action$.pipe(
      ofType(SAVE_PAYMENT_DOCUMENTS),
      mergeMap(req => {
        return this.service
          .sendPaymentDocuments(req.payload)
          .pipe(
            map(res => new SavePaymentDocumentsSuccess(res).createAction())
          );
      })
    );
  };

  addNewCard = (action$: ActionsObservable<any>) => {
    
    return action$.pipe(
      ofType(SAVE_PARTNER_CARD),
      mergeMap(req => {
        return this.service.sendPaymentDocuments(req.payload).pipe(
          map(res => new SavePartnerCardSuccess(res).createAction()),
          mergeMap(res => {
            return this.service.addPaymentCard(res)
          })
        );
      })
    );
  };
}
