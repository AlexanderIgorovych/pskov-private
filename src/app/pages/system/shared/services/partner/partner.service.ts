import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ApiService } from '../../../../../core/http/api.service';
import { PartnerClass } from '../../../../../core/models/partner.model';
import { FormGroup } from '@angular/forms';

const PARTNERS_URL = '/partners/';
const CUTTERS_URL = '/cutters';

interface IIndividualPartner {
  name: string;
  passport_series: string;
  passport_number: string;
  phone_number?: string;
}

interface ILegalPartner {
  name: string;
  inn: string;
  phone_number?: string;
}
@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  constructor(private apiService: ApiService) {}

  createPartner(partner) {
    const { type, ...data } = partner;
    const url = type === 0 ? 'individual' : 'legal';
    const body =
      type === 0 ? data : { name: data.name, inn: data.passport_series, phone_number : data.phone_number };
    return this.apiService
      .post(`${PARTNERS_URL}${url}`, body)
      .pipe(pluck('data'));
  }

  createLegalPartner(partner: ILegalPartner) {
    return this.apiService.post(`${URL}legal`, partner).pipe(pluck('data'));
  }

  getPartnerByPassport(identifier: string): Observable<PartnerClass> {
    return this.apiService
      .get<PartnerClass>(`${PARTNERS_URL}${identifier}`)
      .pipe(pluck('data'));
  }

  verifyNewPartner(data: {
    partner_id: number;
    phone_number: string;
  }): Observable<any> {
    return this.apiService.post(`phone.verify`, data).pipe(pluck('data'));
  }

  verifyPartnerNumber(data: {
    partner_id: number;
    phone_number: string;
    code: number;
  }): Observable<any> {
    return this.apiService.post(`phone.confirm`, data).pipe(pluck('data'));
  }

  getCutters(){
    return this.apiService.get(CUTTERS_URL).pipe(pluck('data'));
  }

  createNewPartnerData(form: FormGroup, number) {
    const PASSPORT_PARTS = form.value.identifier.split(' ');
    const name = form.value.name as string;
    const [passport_series, passport_number] = PASSPORT_PARTS;
    const phone_number = number;

    const value =  form.value.identifier;

    if ((/^[0-9]{2} [0-9]{2} [0-9]{6}$/).test(value)){

      return {
        name : form.controls.name.value,
        passport_number : value.slice(6),
        passport_series : value.slice(0, 6).split(' ').join(''),
        phone_number : number
      }
    }

    if ((/^[0-9]{2} [0-9]{6}$/).test(value)) {
      return {
        name : form.controls.name.value,
        passport_number : value.slice(3),
        passport_series : value.slice(0, 2),
        phone_number : number
      }
    }

    if ((/^[A-Za-z]{2}[0-9]{6}$/).test(value)){
      return {
        name : form.controls.name.value,
        passport_number : value.slice(2),
        passport_series : value.slice(0, 2)
      }
    }

    return {
      name,
      passport_number,
      passport_series,
      phone_number
    };
  }
}
