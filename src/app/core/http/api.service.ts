import {Injectable} from '@angular/core';
import axios, {AxiosResponse} from 'axios';
import {Observable, from, Subscription} from 'rxjs';
import {TokenService} from '../auth/token.service';
import {UserQuery} from '../store/user/user.query';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiInstance;
  private TOKEN: string;

  private s1: Subscription;

  private tokenHeaderFabric() {
    return { 'Authorization': this.TOKEN };
  }

  constructor(private tokenService: TokenService,
              private userQuery: UserQuery) {
    this.TOKEN = this.tokenService.create();
    this.apiInstance = axios.create({
      baseURL: 'https://api-dev.pskovvtormet.ru/api/v1/',
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      }
    });
    this.s1 = this.userQuery.getToken().subscribe((token: string) => {
      this.TOKEN =  token ? `Bearer ${token}` : this.TOKEN;
    });
  }


  get<T>(url: string, params: any = {}): Observable<AxiosResponse<T>> {
    const headers = this.tokenHeaderFabric();
    return from(axios.get(url, {params, headers}));
  }

  post<T>(url: string, data: any = {}): Observable<any> {
    const headers = this.tokenHeaderFabric();
    return from(this.apiInstance.post(url, data, {headers}));
  }

  put<T>(url: string, data: any = {}): Observable<AxiosResponse<T>> {
    const headers = this.tokenHeaderFabric();
    return from(axios.put(url, data, {headers}));
  }

  delete<T>(url: string, data: any = {}): Observable<AxiosResponse<T>> {
    const headers = this.tokenHeaderFabric();
    return from(axios.delete(url, {data, headers}));
  }
}
