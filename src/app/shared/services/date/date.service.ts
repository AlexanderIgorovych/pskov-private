import {Injectable} from '@angular/core';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DateService {
  now(formatTo: string = 'DD.MM.YYYY'): string {
    return moment().format(formatTo);
  }

  transform(value: string, formatForm: string, formatTo: string = 'DD.MM.YYYY'): string {
    return moment(value, formatForm).format(formatTo);
  }
}
