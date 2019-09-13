import { Injectable } from '@angular/core';
import { combineEpics, ActionsObservable, ofType } from 'redux-observable';
import { mergeMap, pluck, map } from 'rxjs/operators';
import {
  SAVE_DOCUMENTS,
  SaveDocumentsSuccess
} from '../add-documents/add-documents.actions';
import { AddCarService } from '../../services/add-car.service';

@Injectable({
  providedIn: 'root'
})
export class AddDocumentsEpicsService {
  addDocuments;
  constructor(private service: AddCarService) {
    this.addDocuments = combineEpics(this.fetchCarMakes);
  }

  fetchCarMakes = (action$: ActionsObservable<any>) => {
    return action$.pipe(
      ofType(SAVE_DOCUMENTS),
      mergeMap(req => {

        return this.service
          .sendDocuments(req.payload.documents, req.payload.documents.type, req.payload.keys)
          .pipe(
            map(res => new SaveDocumentsSuccess(res).createAction())
          );
      })
    );
  };
}
