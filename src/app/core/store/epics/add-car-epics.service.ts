import { Injectable } from '@angular/core';
import { combineEpics, ActionsObservable, ofType } from 'redux-observable';
import {
  FIND_CAR_MAKE_BY_NUMBER,
  FindCarMakeByNumberSuccess,
  CREATE_CAR,
  CreateCarSuccess
} from '../add-car/add-car.actions';
import { mergeMap, pluck, map } from 'rxjs/operators';
import { AutoSuggestedCar, Car, CarService } from '../../services/car.service';
import { AddCarService } from '../../services/add-car.service';

@Injectable({
  providedIn: 'root'
})
export class AddCarEpicsService {
  addCarEpics;
  constructor(
    private service: CarService,
    private addCarService: AddCarService
  ) {
    this.addCarEpics = combineEpics(this.fetchCarMakes, this.createCar);
  }

  fetchCarMakes = (action$: ActionsObservable<any>) => {
    return action$.pipe(
      ofType(FIND_CAR_MAKE_BY_NUMBER),
      mergeMap(req => {
        return this.service.getCarMakes(req.payload).pipe(
          pluck('data', 'items'),
          map((result: Car[]) => this.service.carsMakeSuggestAdapt(result)),
          map((res: AutoSuggestedCar[]) =>
            new FindCarMakeByNumberSuccess(res).createAction()
          )
        );
      })
    );
  };
  createCar = (action$: ActionsObservable<any>) => {
    return action$.pipe(
      ofType(CREATE_CAR),
      mergeMap(req => {
        return this.addCarService.createCar(req.payload).pipe(
          // pluck('data', 'items'),
          // map((result: Car[]) => this.service.carsMakeSuggestAdapt(result)),
          map(res => new CreateCarSuccess(res).createAction())
        );
      })
    );
  };
}
