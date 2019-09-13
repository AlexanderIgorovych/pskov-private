import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../store/rootStore';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PartnerAutouggestValidation {
  constructor() {}
  @select((s: IAppState) => s.partner.autoSuggested)
  static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    if ((value as string).trim().length === 0) {
      return { cannotContainSpace: true };
    }
    return null;
  }
}
