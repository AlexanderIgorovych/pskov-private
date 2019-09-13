import { Injectable } from '@angular/core';
import { ApiService } from '../http/api.service';
import { ConfigService } from '../config.service';
import { HttpClient } from '@angular/common/http';
import { concat } from 'rxjs';
import { mergeMap, pluck } from 'rxjs/operators';

export interface IFile {
  name: string;
  url: string;
  type: number;
  document_type: any;
  source?: Blob;
}

export enum documentTypes {
  car,
  card,
  order,
  partner
}
export enum CarType {
  distributor,
  rented,
  own
}

export interface CarDocuments {
  ttn: string[];
  certificate: string[];
}
export interface RawCarDocuments {
  ttn: IFile[];
  certificate: IFile[];
}
export interface Car {
  type: CarType;
  brand_id: string;
  plate_number: string;
  trailer_plate_number?: string;
}

export interface NewCarRaw extends Car {
  documents: RawCarDocuments;
}
export interface NewCarWidthSavedDocuments extends Car {
  documents: CarDocuments;
}

export const isBlob = el =>
  el.source
    ? el.source.constructor === Blob || el.source.constructor === File
    : false;
@Injectable({
  providedIn: 'root'
})
export class AddCarService {
  constructor(protected data: HttpClient, protected config: ConfigService) {}

  generateMultipartForm(data: IFile[], type?, key?) {
    const arr = [];

    const form = new FormData();
    const targetType = type || data[0].type;
    form.append('type', documentTypes[targetType]);
    data.forEach((el, i) => {
      const isBlobEl = isBlob(el);
      if (!isBlobEl) {
        throw new Error(
          'You cannot pass blob to action creator. In order to send blob - create action as plain object by yourself'
        );
      }
      form.append('keys[]', key[i]);
      form.append('documents[]', el.source);
    });
    return form;
  }

  sendDocuments(data: IFile[], type?, key?) {
    const dataToSend = this.generateMultipartForm(data, type, key);
    return this.data.post(this.config.documents, dataToSend)
  };

  createCar(data) {
    return concat(
      this.sendDocuments(data.documents.ttn, data.type, data.document_type).pipe(pluck('data')),
      this.sendDocuments(data.documents.certificate, data.type, data.document_type).pipe(pluck('data'))
    ) //.pipe(
    //   mergeMap(([ttn, certificate]) => {
    //     const { documents, ...car } = data;
    //     const newData: NewCarWidthSavedDocuments = {
    //       ...car,
    //       documents: {
    //         ttn,
    //         certificate
    //       }
    //     };
    //     return this.data.post(this.config.cars, newData);
    //   })
    // );
  }
}
