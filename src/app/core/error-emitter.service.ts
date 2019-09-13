import { Injectable } from '@angular/core';
import { Observable, pipe, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { createEpicMiddleware, combineEpics } from 'redux-observable';
import { ErrorHandlerService } from './error-handler.service';
import { AxiosError } from '../../../node_modules/axios';

@Injectable()
export class ErrorEmitterService {
  constructor(public errorHandler: ErrorHandlerService) {}

  errorEmitter(stream: Observable<any>): Observable<any> {
    return stream.pipe(
      map((err: AxiosError) => this.errorHandler.handleError(err)),
      tap(actionError => {
        console.log(actionError);
      })
    );
  }

  combineEpicsAndCatchErrors = (...epics) => {
    return (action$, state$) => {
      epics = epics.map(epic => (action$, state$) =>
        epic(action$, state$).pipe(catchError(e => this.errorEmitter(of(e))))
      );
      return combineEpics(...epics)(action$, state$);
    };
  };
}
