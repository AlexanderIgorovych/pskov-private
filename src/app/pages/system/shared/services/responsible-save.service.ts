import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/http/api.service';

@Injectable({
  providedIn: 'root'
})
export class ResponsibleSaveService {



  constructor(private apiService : ApiService) {}

  sendReasonsTypes = (data) => this.apiService.post('/saves', data);
}
