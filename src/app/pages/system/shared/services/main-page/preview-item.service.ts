import { Injectable } from '@angular/core';
import { ApiService } from '../../../../../core/http/api.service';

@Injectable({
  providedIn: 'root'
})
export class PreviewItemService {

  constructor(private apiService : ApiService) { }

  // get all orders
  getOrders = (status, offset, amount, q = '') => {
    const params = new URLSearchParams();

    params.set('status', status.toString())
    params.set('offset', offset.toString())
    params.set('amount', amount.toString())
    params.set('q', q)

    return this.apiService.get(`/orders?${params}`)
  }
}
