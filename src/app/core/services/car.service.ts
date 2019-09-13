import { Injectable } from '@angular/core';
import { ApiService } from '../http/api.service';
import { ConfigService } from '../config.service';
import { AutoSuggestOption } from '../../shared/components/autosuggets/autosuggets.component';
export interface Car {
  id: number;
  own_type: 0 | 1 | 2;
  brand: string;
  plate_number: string;
  blocked: boolean;
}

// Don't touch it if you don't want rewrite it!:)

export const REGEX_CAR = /^([A-Z]{2} [0-9]{3} [A-Z0-9]{2,3}|[A-Z]{2} [0-9]{4} [A-Z]{2}-[A-Z0-9]{1}|[0-9]{4} [A-Z]{2}-[0-9]{1}|[A-Z]{2} [0-9]{4}-[0-9]{1}|[A-Z]{2} [0-9]{3}-[0-9]{1}|[A-Z0-9]{2} [0-9]{3}-[0-9]{2} [A-Z]{2}|[A-Z]{3} [0-9]{3}|[A-Z]{2} [0-9]{4} [A-Z0-9]{2,3}|[A-Z]{2} [0-9]{4} [A-Z0-9]{2}|[A-Z]{3} [0-9]{3}|[A-Z]{1} [0-9]{4} [A-Z0-9]{2, 3}|[A-Z]{2} [0-9]{4} [A-Z0-9]{2,3}|[0-9]{4} [A-Z]{2} [A-Z0-9]{2,3}|[A-Z]{4} [0-9]{4}|[0-9]{4} [A-Z]{2}|[A-Z]{2} [0-9]{4}|[A-Z]{2} [0-9]{3} [A-Z]{1} [A-Z0-9]{2,3}|[A-Z]{1} [0-9]{3} [A-Z]{2} [A-Z0-9]{2,3}|[A-Z]{2} [A-Z]{2} [0-9]{3}|[A-Z]{2} [A-Z]{2} [0-9]{3} [0-9A-Z]{2}|[A-Z]{1} [0-9]{4} [A-Z]{2}|[0-9]{4} [A-Z]{3}|[A-Z]{1} [0-9]{4} [A-Z]{2} [A-Z0-9]{2,3})$/


export interface AutoSuggestedCar extends Car, AutoSuggestOption {}

@Injectable()
export class CarService {
  constructor(private data: ApiService, private config: ConfigService) {}

  getCars(own_type: 0 | 1 | 2, number: string) {
    return this.data.get(this.config.getCarsByNum(own_type, number));
  }
  getCar(number: string) {
    return this.data.get(this.config.getCarByNum(number));
  }
  checkCar(number: string) {
    return this.data.get(this.config.checkCar(number));
  }
  getCarMakes(number: string) {
    return this.data.get(this.config.getCarMake(number));
  }

  getTraliers(own_type: 0 | 1 | 2, number: string) {
    return this.data.get(this.config.getTrailersByNum(own_type, number));
  }
  getTrailer(number: string) {
    return this.data.get(this.config.getTralierByNum(number));
  }
  checkTrailer(number: string) {
    return this.data.get(this.config.checkTrailer(number));
  }

  carsAutosugestAdapt(cars: Car[]): AutoSuggestedCar[] {
    return cars.map(partner => this.carAutoSuggestAdapt(partner));
  }
  carAutoSuggestAdapt(car: Car): AutoSuggestedCar {
    return {
      ...car,
      title: car.plate_number
    };
  }
  carMakeSuggestAdapt(car): AutoSuggestedCar {
    return {
      ...car,
      title: car.name
    };
  }
  carsMakeSuggestAdapt(cars) {
    return cars.map(partner => this.carMakeSuggestAdapt(partner));
  }
}
