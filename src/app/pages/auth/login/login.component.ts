import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgRedux, select } from '@angular-redux/store';

import { IAppState } from '../../../core/store/rootStore';
import { AuthService } from '../../../core/auth/auth.service';
import { AffiliateEntity } from '../../../shared/entitys/affiliate.entity';
import { AffiliateService } from '../../../shared/services/affiliate/affiliate.service';
import { Subscription } from 'rxjs';
import { PropertyActions } from '../../../core/store/property/property.actions';
import { PropertyQuery } from '../../../core/store/property/property.query';
import { filter } from 'rxjs/operators';
import { SavePickedAffilateLogin } from '../../../core/store/partner/partner.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  s1: Subscription;
  s2: Subscription;

  form: FormGroup;
  affiliates: AffiliateEntity[];

  @select((s : IAppState) => s.user.isWrongError) isErrorCredt;

  isAsyncError : boolean = false;

  constructor(
    public ngRedux: NgRedux<IAppState>,
    private authService: AuthService,
    private affiliateService: AffiliateService,
    private propertyActions: PropertyActions,
    private propertyQuery: PropertyQuery
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      number    : new FormControl(null,
        [
          Validators.required, Validators.minLength(6), Validators.maxLength(6)
        ],
        [this.isNumber.bind(this)]
      )
    });


    this.onChangesForm();
    // this.s1 = this.affiliateService
    //   .getAffiliatesList()
    //   .subscribe((res: AffiliateEntity[]) => {
    //     this.ngRedux.dispatch(this.propertyActions.getAffiliates(res));
    //   });
    //
    // this.s2 = this.propertyQuery.getAffiliatesList().subscribe(res => {
    //   this.affiliates = res;
    // })
  };

  onChangesForm(){
    this.form.valueChanges.subscribe(() => this.isAsyncError = false)
  }

  ngOnDestroy() {
    // this.s1.unsubscribe();
    // this.s2.unsubscribe();
  }

  isNumber(control: FormControl): Promise<any> {
    return new Promise(resolve => {
      const val: any = control.value;
      const isNumber = !isNaN(val);
      resolve(isNumber ? null : { isNumber: isNaN(val) });
    });
  }

  onSubmit() {
    const formData = this.form.value;

    return new Promise((resolve) => {
      this.authService.login({
        affiliate_id: "00002",
        auth_code: formData.number
      })
      resolve();

    }).then(() => this.isErrorCredt.pipe(
        filter(res     => res === true)
      ).subscribe(data => this.isAsyncError = data)
    )
  }
}
