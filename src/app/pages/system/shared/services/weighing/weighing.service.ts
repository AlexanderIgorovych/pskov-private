import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/http/api.service';
import { SaveWeighId } from '../../../../../core/store/weigh/weigh.action';



export interface TableData {
  id : any
  date : any
  car  : any
  waste : string
  typeScrap : string
  origin : any
  weigh : number
  tare : any
  container : any
  errorWeigh : number
  weighter : any
  bigbag : any
  typeBigbag : any,
  newest : boolean,
  actType : any,
  cutter : any
}

export interface FinallyTableData {
  id : number,
  typeScrap : string,
  origin    : string,
  weighNet  : number,
  waste : number,
  weigh : number
}

export interface GarbageData {
  weighGarbage : string,
  typeGrarbage : string
}

@Injectable({
  providedIn: 'root'
})
export class WeighingService {

  constructor(private apiService : ApiService) { }

  // get requests

  getScaleList  = () => this.apiService.get(`/weighers?amount=10&offset=0`)

  getBigbags    = () => this.apiService.get('/bigbags');

  getScraps     = () => this.apiService.get(`/scraps`);

  // send weighning data and give unique weigh id

  postWeighnings = (order_id, weights) => {
    const body = {
      order_id,
      weighnings : [...weights]
    };

    // this.apiService.post('/weighings', body)
    //   .subscribe(res => new SaveWeighId(res.data.id).createAction())
  }
}
