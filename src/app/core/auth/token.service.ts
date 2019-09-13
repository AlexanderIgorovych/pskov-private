import {Injectable} from '@angular/core';
import * as md5 from 'md5';
import {DateService} from '../../shared/services/date/date.service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private secret: string = 'PVHF3hP%d*RMMMUJuwj3sW4^Cq5D+K6yq-3kNsYU'.toString();

  constructor(private dateService: DateService) {
  }

  create(): string {
    const date = this.dateService.now('DD/MM/YYYY');
    return 'Key ' + md5(`${date}${this.secret}`);
  }
}
