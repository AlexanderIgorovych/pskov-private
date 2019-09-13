import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {
  public login = 'placeholder';
  public credentials = 'placeholder';
  public documents = 'documents';
  public cars = 'cars';
  public callbacks = 'callbacks';
  public cards = 'cards';

  public getPartnersByNum = (num: string) =>
    `partners?amount=100&offset=0&q=${num}`;
  public getPartnerByNum = num => `partners/${num}`;
  public checkPartner = (num: string, type: number) =>
    `partners.check/${num}?partner_type=${type}`;

  public getCarsByNum = (ownType: 0 | 1 | 2, num: string) =>
    `cars?amount=100&offset=0&q=${num}&own_type=${ownType}`;
  public getCarByNum = num => `cars/${num}`;
  public checkCar = (num: string) => `cars.check/${num}`;

  public getTrailersByNum = (ownType: 0 | 1 | 2, num: string) =>
    `trailers?amount=100&offset=0&q=${num}&own_type=${ownType}`;
  public getTralierByNum = num => `trailers/${num}`;
  public checkTrailer = (num: string) => `trailers.check/${num}`;
  public getCarMake = (num: string) => `brands?amount=100&offset=0&q=${num}`;
  public getCards = (partner_id: string, type: number) =>
    `cards/${partner_id}?type=${type}`;
}
