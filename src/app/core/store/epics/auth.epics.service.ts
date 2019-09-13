import {Injectable} from '@angular/core';
import {ActionsObservable} from 'redux-observable';
import {combineEpics, ofType} from 'redux-observable';

import {NgRedux, select} from '@angular-redux/store';
import {DataService} from '../../data.service';
import {ConfigService} from '../../config.service';
import {pipe, of} from 'rxjs';
import {mergeMap, pluck, map, tap} from 'rxjs/operators';
import {ErrorEmitterService} from '../../error-emitter.service';
import {BaseAction, ActionWithPayload} from '../../models/interfaces/common';
import {ShowSchema} from '../../models/schemas/exampleSchema';
import {normalize} from 'normalizr';

@Injectable()
export class AuthEpicsService {
  public authEpics;

  constructor(private service: DataService, private config: ConfigService) {
    this.authEpics = combineEpics(this.fetchData);
  }

  fetchData = (action$: ActionsObservable<any>) => {
    return action$.pipe(
      ofType('HERE GOES YOUR ACTION FOR REQUEST'),
      mergeMap((req: BaseAction) => {
        return this.service.getAll('Some URL').pipe(
          pluck('data'),

          map(
            (result: any): ActionWithPayload<any> => ({
              type: 'HERE GOES YOUR ACTION FOR SUCCESS RESPONSE',
              payload: normalize(result, ShowSchema)
            })
          )
        );
      })
    );
  };
}
