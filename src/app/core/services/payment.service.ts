import { ConfigService } from '../config.service';
import { HttpClient } from '@angular/common/http';
import { AddCarService, IFile } from './add-car.service';
import { Injectable } from '@angular/core';
import { concat, forkJoin } from 'rxjs';
import { pluck, tap, map, filter, first, mergeMap } from 'rxjs/operators';
import { SavedDocuments } from '../store/payment/payment.store';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store/rootStore';

export interface RawDocumentsData {
  requisites: IFile[];
  cardFace: IFile[];
}
export interface PaymentResponseFile {
  original_name: string;
  path: string;
}
export type PaymentDocsResponse = [
  PaymentResponseFile[],
  PaymentResponseFile[]
];
@Injectable()
export class PaymentService extends AddCarService {
  constructor(
    data: HttpClient,
    config: ConfigService,
    private ngRedux: NgRedux<IAppState>
  ) {
    super(data, config);
  }

  @select((s: IAppState) => s.partner.pickedPartner) pickedPartner;

  sendPaymentDocuments(data: RawDocumentsData) {
    return forkJoin(
      this.sendDocuments(data.requisites),
      this.sendDocuments(data.cardFace)
    ).pipe(
      map(
        (res: PaymentDocsResponse): SavedDocuments => ({
          requisites: res[0].map(el => el.path),
          cardFace: res[1].map(el => el.path)
        })
      )
    )
  }

  addPaymentCard(inputData) {
    return this.pickedPartner.pipe(
      filter(res => !!res),
      first(),
      mergeMap((res: any) => {
        const dataToSend = {
          partner_id: res.id,
          documents: {
            requisites: inputData.payload.requisites,
            photo: inputData.payload.cardFace
          }
        };
        return this.data.post(this.config.cards, dataToSend);
      })
    );
  }

  sendPaymentCard = (data) => this.data.post(this.config.cards, data)
}
