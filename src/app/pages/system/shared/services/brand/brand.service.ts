import {Injectable} from '@angular/core';
import {IBrandRequest, IBrandResponse} from './brandBody.type';
import {ApiService} from '../../../../../core/http/api.service';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  private url = 'brands';

  constructor(private apiService: ApiService) {
  }

  getWithParams(data: IBrandRequest): any {
    this.apiService.get(this.url, data).subscribe(
      (result) => {
        // result
      },
      (error) => {
        // result
      }
    );
  }
}
