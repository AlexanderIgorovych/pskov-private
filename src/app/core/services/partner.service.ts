import { Injectable } from '@angular/core';
import { ApiService } from '../http/api.service';
import { ConfigService } from '../config.service';
import { Partner } from '../models/partner.model';
import { AutoSuggestOption } from '../../shared/components/autosuggets/autosuggets.component';
import { forkJoin, pipe } from 'rxjs';
import { pluck } from 'rxjs/operators';
export interface AutoSuggestedPartner extends Partner, AutoSuggestOption {}
export const PASSPORT_CONDITION = /^([A-Za-z]{1}[0-9]{8}|[A-Za-z]{1}[0-9]{7}|[A-Za-z]{2}[0-9]{7}|[0-9]{2}[A-Za-z]{2}[0-9]{5}|[A-Za-z]{2}[0-9]{6}|[A-Za-z]{2}[0-9]{7}|[A-Za-z]{2}[0-9]{7}|[A-Za-z]{2}[0-9]{6}|[A-Za-z]{2}[0-9]{7}|[0-9]{6}|[A-Za-z]{1}[0-9]{7}|[A-Za-z]{2}[0-9]{7}|[A-Za-z]{1}[0-9]{6}|[0-9]{7}|[0-9]{2} [0-9]{6}|[0-9]{2} [0-9]{2} [0-9]{6})$/;
export const PASSPORT_REGEX = /^([A-Za-z|А-ЯЁа-яё]){2,2}\s([0-9]{6,6})$/;

export const INN_REGEX = /^([0-9]{12})$/;
export const PHONE_REGEX = /^(\d{8,15})$/gm;
export const PHONE_CODE_REGEX = /^\d{4,4}$/gm;

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  constructor(private data: ApiService, private config: ConfigService) {}

  requestCall() {
    return this.data.post(this.config.callbacks);
  }

  private adaptPartnerNumber(number: string): string {
    return number.split(' ').join('');
  }

  getPartners(number: string) {
    const validNum = this.adaptPartnerNumber(number);
    return this.data.get(this.config.getPartnersByNum(validNum));
  }
  getPartner(number: string) {
    const validNum = this.adaptPartnerNumber(number);
    return this.data.get(this.config.getPartnerByNum(validNum));
  }
  checkPartner(data) {
    const validNum = this.adaptPartnerNumber(data.identifier);
    return forkJoin(
      this.data
        .get(this.config.checkPartner(validNum, data.type))
        .pipe(pluck('data')),
      this.data
        .get(this.config.getCards(data.id, data.type))
        .pipe(pluck('data'))
    );
  };

  detectType = (partner, number) => {
    if (partner.passport.indexOf(number) == 0) {
      return partner.passport
    }
  }


  partnerAutoSuggestAdapt(partner: Partner, num?): AutoSuggestedPartner {

    return {
      ...partner,
      title: num && partner.name.toLowerCase().indexOf(num.toLowerCase()) !== -1 ? partner.name : partner.passport || partner.inn || partner.international_passport
    };
  }
  partnersAutosugestAdapt(partners: Partner[], number): AutoSuggestedPartner[] {
    return partners.map(partner => this.partnerAutoSuggestAdapt(partner, number));
  }
}
