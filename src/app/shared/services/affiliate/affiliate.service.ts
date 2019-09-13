import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/http/api.service';
import { Observable } from 'rxjs';
import { AffiliateEntity } from '../../entitys/affiliate.entity';
import { pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AffiliateService {
  private url = 'affiliates';

  constructor(private apiService: ApiService) {}

  getAffiliatesList(): Observable<AffiliateEntity[]> {
    return this.apiService.get<AffiliateEntity[]>(this.url).pipe(pluck('data'));
  }
}
