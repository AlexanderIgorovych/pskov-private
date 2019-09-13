import {Injectable} from '@angular/core';
import {ConfigService} from './config.service';
import {from} from 'rxjs';
import axios, { AxiosResponse } from 'axios';
import {Observable} from 'rxjs';
import {TokenService} from './auth/token.service';

@Injectable()
export class DataService {

  constructor(private config: ConfigService,
              private tokenService: TokenService) {
    const AUTH_TOKEN = this.tokenService.create();
    axios.defaults.baseURL = 'https://api-dev.pskovvtormet.ru/api/v1';
    axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  }

  getAll(url: string): Observable<AxiosResponse<any>> {
    return from(axios.get(url));
  }

  getWithParams(url: string, params: any): Observable<AxiosResponse<any>> {
    return from(axios.get(url, {params}));
  }

  create(url: string, data): Observable<AxiosResponse<any>> {
    return from(axios.post(url, data));
  }

  patch(url: string, data): Observable<AxiosResponse<any>> {
    return from(axios.patch(url, data));
  }

  update(url: string, data): Observable<AxiosResponse<any>> {
    return from(axios.put(url, data));
  }

  remove(url: string): Observable<AxiosResponse<any>> {
    return from(axios.delete(url));
  }
}
