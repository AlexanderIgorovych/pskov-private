import { Injectable } from '@angular/core';
import { CarService, Car, AutoSuggestedCar } from '../../services/car.service';
import { combineEpics, ActionsObservable, ofType } from 'redux-observable';
import {
  FIND_CAR_BY_NUMBER,
  FindCarByNumberSuccess,
  FIND_TRAILER_BY_NUMBER,
  FindTrailerByNumberSuccess,
  FindTrailerByNumberRestore
} from '../car/car.actions';
import { mergeMap, pluck, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarEpicsService {
  carEpics;
  constructor(private service: CarService) {
    this.carEpics = combineEpics(this.fetchCars, this.fetchTrailers);
  }

  fetchCars = (action$: ActionsObservable<any>) => {
    return action$.pipe(
      ofType(FIND_CAR_BY_NUMBER),
      mergeMap(req => {
        return this.service.getCars(req.payload.type, req.payload.number).pipe(
          pluck('data', 'items'),
          map((result: Car[]) => this.service.carsAutosugestAdapt(result)),
          map((res: AutoSuggestedCar[]) =>
            new FindCarByNumberSuccess(res).createAction()
          )
        );
      })
    );
  };

  fetchTrailers = (action$: ActionsObservable<any>) => {
    return action$.pipe(
      ofType(FIND_TRAILER_BY_NUMBER),
      mergeMap(req => {
        return req.payload.number !== undefined && !req.payload.number.length
          ? of(new FindTrailerByNumberRestore([]).createAction())
          : this.service.getTraliers(req.payload.type, req.payload.number).pipe(
              pluck('data', 'items'),
              map((result: Car[]) => this.service.carsAutosugestAdapt(result)),
              map((res: AutoSuggestedCar[]) =>
                new FindTrailerByNumberSuccess(res).createAction()
              )
            );
      })
    );
  };
}
