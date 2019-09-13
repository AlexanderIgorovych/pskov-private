import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AffiliateService } from '../../../../../../../shared/services/affiliate/affiliate.service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../../../../../core/store/rootStore';
import { Subscription } from 'rxjs';
import { AffiliateEntity } from '../../../../../../../shared/entitys/affiliate.entity';
import { PropertyActions } from '../../../../../../../core/store/property/property.actions';
import { PropertyQuery } from '../../../../../../../core/store/property/property.query';
import { SaveClientCard } from '../../../../../../../core/store/payment/payment.actions';

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.component.scss']
})
export class CashComponent implements OnInit {
  pickedPlace = 'участок приёмки';
  pickedAffiliate;
  defaultPlaceholder = 'Участок не выбран';
  pickedPlaceholder = 'Участок не выбран';
  defaultAffilate;

  s1 : Subscription;
  s2 : Subscription;
  s3 : Subscription;

  constructor(
    private affiliateService : AffiliateService,
    private ngRedux : NgRedux<IAppState>,
    private propertyQuery: PropertyQuery,
    private propertyActions : PropertyActions) {}

  @Input() places = ['участок приёмки', 'другой участок'];
  @Input() requestedPay = false;


  affiliates;

  @Output() requestPay = new EventEmitter();

  // connect redux props (not React)
  @select((s : IAppState) => s.partner.pickedAffileateDefault) defaultPickedAffilate;

  pickAffiliate(affiliate) {
    this.pickedAffiliate = affiliate.value;
  }

  handlePicked = place => {
    this.pickedAffiliate = undefined;
    this.pickedPlace = place;
    place === 'участок приёмки' ? this.getDefailtAffilate() : null
  }

  requestingPay() {
    this.requestPay.emit();
    this.ngRedux.dispatch(new SaveClientCard(this.pickedAffiliate).createAction());
  }

  isDefaultPlacePicked() {
    return this.pickedPlace === 'участок приёмки' && this.pickedAffiliate !== undefined;
  }

  get enabledConfirm() {
    return (
      (this.isDefaultPlacePicked() || this.pickedAffiliate) &&
      !this.requestedPay
    );
  }

  getDefailtAffilate(){
    this.defaultPickedAffilate.subscribe(affilate => this.pickedAffiliate = affilate)
  }

  ngOnInit() {
    this.getDefailtAffilate();

    this.s1 = this.affiliateService
      .getAffiliatesList()
      .subscribe((res: AffiliateEntity[]) => {
        this.ngRedux.dispatch(this.propertyActions.getAffiliates(res));
      });

    this.s2 = this.propertyQuery.getAffiliatesList().subscribe(res => {
      this.affiliates = res;
    })
  }
}
