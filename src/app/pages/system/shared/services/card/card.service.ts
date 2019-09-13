import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { ApiService } from '../../../../../core/http/api.service';
import { Card } from '../../../../../shared/entitys/cards.entity';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private url = 'cards/';

  // Declare Service
  constructor(private apiService : ApiService){}

  // Get List of Cards from API
  getQiwiList(idPartner) : Observable<Card[]> {
    return this.apiService.get<Card[]>(this.url + idPartner, { type : 1 }).pipe(pluck('data'))
  }

  orderCard(postData) {
    return this.apiService.post(`${this.url}qiwi`, postData)
  }

}
