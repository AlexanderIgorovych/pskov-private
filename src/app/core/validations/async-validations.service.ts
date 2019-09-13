import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

export interface AsyncValidationErrors {
  async: any;
}
@Injectable({
  providedIn: 'root'
})
export class AsyncValidationsService {
  constructor() {}
  addAutosuggestErr(
    control: AbstractControl,
    error: AsyncValidationErrors = { async: true }
  ) {
    const currentErrors = control.errors;
    if (!currentErrors || (currentErrors && !currentErrors.async)) {
      control.setErrors({ ...currentErrors, ...error });
    }
  }
  removeAutosuggestAsyncErr(control: AbstractControl) {
    const currentErrs = control ? control.errors : null;
    if (currentErrs) {
      const { async, ...newErrs } = currentErrs;
      control.setErrors(newErrs);
    }
  }
}
