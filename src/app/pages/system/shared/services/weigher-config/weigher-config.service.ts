import { Injectable } from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WeigherConfigService {
  // url params
  baseConfigURL = 'http://localhost:8080/';
  pathURL = 'weigther-service/weight/'

  // subject

  weigh = new BehaviorSubject(null)

  constructor() { }
  /*
    Get Weigh by weigher name using web service. You should to subscribe on behavior object
    in onInit Lyficicle hook, and using value whatever you want
  */

  parseToTonn = weigh => {
    const value = weigh / 1000;
    return value.toFixed(2);
  }
  pargeToKg   = weigh => {
     const value = weigh * 1000;
     return value.toFixed(2);
  }

  getWeighByService (weigher) {
    axios.get(this.baseConfigURL + this.pathURL + weigher)
      .then(
        (response : AxiosResponse) => this.weigh.next(response.data),
        (error) => console.log(error)
      )
  }


}
