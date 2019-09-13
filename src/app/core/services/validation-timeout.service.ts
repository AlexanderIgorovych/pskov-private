import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map, debounceTime } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationTimeoutService {

  constructor() { }

  /* This service return boolean value only after the user has stopped entering */

  public errorIsShow = new BehaviorSubject(null);

  onDetectErrorAllForm = (form : FormGroup) => {
    form.valueChanges.pipe(
      map(() => this.errorIsShow.next(false)),
      debounceTime(1000)

    ).subscribe(() => form.valid ? this.errorIsShow.next(false) : this.errorIsShow.next(true));
  }
}
