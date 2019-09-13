import {Injectable} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {AffiliateEntity} from '../../../shared/entitys/affiliate.entity';

@Injectable({
  providedIn: 'root'
})
export class PropertyQuery {
  @select(s => s.property.affiliates)
  private affiliateList: Observable<AffiliateEntity[]>;


  // Exports
  getAffiliatesList(): Observable<AffiliateEntity[]> {
    return this.affiliateList;
  }
}
