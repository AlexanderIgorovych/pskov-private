import { Injectable } from '@angular/core';
import { ConfigService } from '../../config.service';
import { combineEpics, ActionsObservable, ofType } from 'redux-observable';
import { mergeMap, pluck, map, catchError } from 'rxjs/operators';
import {
  FIND_PARTNER_BY_PASSPORT,
  FindByPasport,
  FindByPasportSuccess,
  CHECK_PARTNER,
  CheckPartnerSuccess,
  CheckPartnerError,
  CheckPartner,
  CHECK_PARTNER_NEW,
  CheckPartnerNewSuccess,
  CheckPartnerNewError,
  ADD_PARTNER_PHONE,
  AddPartnerPhoneSuccess,
  AddPartnerPhoneError,
  VERIFY_PARTNER_PHONE,
  VerifyPartnerPhoneSuccess,
  VerifyPartnerPhoneError,
  GET_NEW_PARTNER_INFO,
  GetNewPartnerInfoSuccess,
  GetNewPartnerInfoError
} from '../partner/partner.actions';
import {
  PartnerService,
  AutoSuggestedPartner
} from '../../services/partner.service';
import { Partner } from '../../models/partner.model';
import { of } from 'rxjs';
import { PartnerService as PartnerData } from '../../../pages/system/shared/services/partner/partner.service';
import { REQUEST_CALL } from '../main.actions';
@Injectable({
  providedIn: 'root'
})
export class PartnerEpicsService {
  public partnerEpics;

  constructor(
    private service: PartnerService,
    private partnerData: PartnerData
  ) {
    this.partnerEpics = combineEpics(
      this.fetchPartners,
      this.checkPartners,
      this.checkPartnersNew,
      this.verifyPartnersNew,
      this.verifyPartnerNumber,
      this.getPartnerInfoForPrefill,
      this.requestCall
    );
  }

  fetchPartners = (action$: ActionsObservable<any>) => {
    return action$.pipe(
      ofType(FIND_PARTNER_BY_PASSPORT),
      mergeMap((req: FindByPasport) => {
        return this.service.getPartners(req.payload.number).pipe(
          pluck('data', 'items'),
          map((result: Partner[]) =>
            this.service.partnersAutosugestAdapt(result, req.payload.number)
          ),
          map((res: AutoSuggestedPartner[]) =>
            new FindByPasportSuccess(res).createAction()
          )
        );
      })
    );
  };
  checkPartners = (action$: ActionsObservable<any>) => {
    return action$.pipe(
      ofType(CHECK_PARTNER),
      mergeMap((req) => {
        return this.service.checkPartner(req.payload).pipe(
          map(res => new CheckPartnerSuccess(res[1]).createAction()),
          catchError(err =>
            of(err).pipe(
              pluck('response', 'data', 'error'),
              map(data => {
                return new CheckPartnerError(data).createAction();
              })
            )
          )
        );
      })
    );
  };
  checkPartnersNew = (action$: ActionsObservable<any>) => {
    return action$.pipe(
      ofType(CHECK_PARTNER_NEW),
      mergeMap(req => {
        return this.partnerData.createPartner(req.payload).pipe(
          map(res => new CheckPartnerNewSuccess(res).createAction()),
          catchError(err =>
            of(err).pipe(
              pluck('response', 'data', 'error'),
              map(data => {
                return new CheckPartnerNewError(data).createAction();
              })
            )
          )
        );
      })
    );
  };
  verifyPartnersNew = (action$: ActionsObservable<any>) => {
    return action$.pipe(
      ofType(ADD_PARTNER_PHONE),
      mergeMap(req => {
        return this.partnerData.verifyNewPartner(req.payload).pipe(
          map(res => new AddPartnerPhoneSuccess(res).createAction()),
          catchError(err =>
            of(err).pipe(
              pluck('response', 'data', 'error'),
              map(data => {
                return new AddPartnerPhoneError(data).createAction();
              })
            )
          )
        );
      })
    );
  };
  verifyPartnerNumber = (action$: ActionsObservable<any>) => {
    return action$.pipe(
      ofType(VERIFY_PARTNER_PHONE),
      mergeMap(req => {
        return this.partnerData.verifyPartnerNumber(req.payload).pipe(
          map(res => new VerifyPartnerPhoneSuccess(res).createAction()),
          catchError(err =>
            of(err).pipe(
              pluck('response', 'data', 'error'),
              map(data => {
                return new VerifyPartnerPhoneError(data).createAction();
              })
            )
          )
        );
      })
    );
  };
  getPartnerInfoForPrefill = (action$: ActionsObservable<any>) => {
    return action$.pipe(
      ofType(GET_NEW_PARTNER_INFO),
      mergeMap(req => {
        //
        return this.service.getPartner(req.payload).pipe(
          pluck('data'),
          map((data: Partner) => this.service.partnerAutoSuggestAdapt(data)),
          map(res => new GetNewPartnerInfoSuccess(res).createAction()),
          catchError(err =>
            of(err).pipe(
              pluck('response', 'data', 'error'),
              map(data => {
                return new GetNewPartnerInfoError(data).createAction();
              })
            )
          )
        );
      })
    );
  };
  requestCall = (action$: ActionsObservable<any>) => {
    return action$.pipe(
      ofType(REQUEST_CALL),
      mergeMap(req => {
        return this.service.requestCall().pipe(
          pluck('data'),
          map(res => ({ type: 'CALL_BACK_SUCCESS' })),
          catchError(err =>
            of(err).pipe(
              pluck('response', 'data', 'error'),
              map(data => {
                return { type: 'CALL_BACK_ERROR' };
              })
            )
          )
        );
      })
    );
  };
}
