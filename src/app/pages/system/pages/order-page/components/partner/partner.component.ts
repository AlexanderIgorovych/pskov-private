import {
  Component,
  OnInit,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { PartnerService } from '../../../../shared/services/partner/partner.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PartnerClass } from '../../../../../../core/models/partner.model';
import {
  FindByPasport,
  FindByPasportClear,
  FindByPasportPick,
  CheckPartner,
  ResetNumberExist
} from '../../../../../../core/store/partner/partner.actions';
import { AutoSuggestOption } from '../../../../../../shared/components/autosuggets/autosuggets.component';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../../../../core/store/rootStore';
import { Observable, Subscription, combineLatest, interval } from 'rxjs';
import { AutoSuggestedPartner } from '../../../../../../core/services/partner.service';
import { PartnerAutouggestValidation } from '../../../../../../core/validations/partner-autosuggest.validators';
import { unsubscribeAll, isOnline } from '../../../../../../core/untils';
import { filter, map, first } from 'rxjs/operators';
import { AsyncValidationsService } from '../../../../../../core/validations/async-validations.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ModalPartnerComponent } from '../../../../shared/modules/dialog/components/modal-partner/modal-partner.component';

@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.scss']
})
export class PartnerComponent implements OnInit, OnDestroy {

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private asyncValidation: AsyncValidationsService,
    public dialog: MatDialog
  ) {
    this.form = new FormGroup({
      identifier: new FormControl(null, [
        Validators.required,
        PartnerAutouggestValidation.cannotContainSpace
      ])
    });
  };

  form: FormGroup;
  emptyParnerPlaceholder = 'Код/наименование';
  private subscriptions: Subscription[] = [];
  isPartnerInfoVisible: Observable<boolean>;
  isCheckButtonDisables: Observable<boolean>;
  internetConnectionCheckPing = 3000;
  partnerDialog: MatDialogRef<ModalPartnerComponent>;

  @Output() nextStep = new EventEmitter();

  @select((s: IAppState) => s.partner.autoSuggested) autoSuggested: Observable<
    AutoSuggestedPartner[]
  >;
  @select((s: IAppState) => s.partner.pickedPartner) pickedPartner: Observable<
    AutoSuggestedPartner
  >;
  @select((s: IAppState) => s.partner.isPickedPartnerForbidden)
  isPickedPartnerForbidden: Observable<boolean>;
  @select((s: IAppState) => s.partner.newPickedPartner)
  newPickedPartner: Observable<AutoSuggestedPartner>;

  searchForPartner(data: string) {
    if (this.identifier.valid) {
      const payload = { number: data };
      this.ngRedux.dispatch(new FindByPasport(payload).createAction());
    }
  }

  setPartnerVisibility() {
    return combineLatest(
      this.isPickedPartnerForbidden,
      this.pickedPartner
    ).pipe(
      map(
        ([forbidden, partner]) =>
          !!(forbidden !== undefined && partner && this.identifier.valid)
      )
    );
  }

  autoSuggestChange(data: string) {

    if (data.length === 0) {
      this.ngRedux.dispatch(new FindByPasportClear().createAction());
      return;
    }
    this.searchForPartner(data);
  }
  setPicketSuggestion(data: AutoSuggestedPartner) {
    this.ngRedux.dispatch(new FindByPasportClear().createAction());
    this.ngRedux.dispatch(new FindByPasportPick(data).createAction());
  }

  get identifier() {
    return this.form.controls['identifier'];
  }

  isAutosuggestEmpty(data) {
    return (
      data !== undefined &&
      !data.length &&
      this.identifier.dirty &&
      this.identifier.value
    );
  }

  checkPartner(data: string) {
    this.pickedPartner
      .pipe(
        filter(res => !!res),
        first()
      )
      .subscribe(res => {
        const payload = {
          type: res.type,
          identifier: res.type ? res.inn : res.passport || res.international_passport,
          id: res.id
        };
        this.ngRedux.dispatch(new CheckPartner(payload).createAction());
      });
  }

  detectAsyncErrors() {
    const errors = this.autoSuggested
      .pipe(filter(data => this.isAutosuggestEmpty(data)))
      .subscribe(res => {
        this.ngRedux.dispatch(new FindByPasportClear().createAction());
        this.asyncValidation.addAutosuggestErr(this.identifier);
      });
    this.subscriptions.push(errors);
  }

  detectRemoveAsyncErrors() {
    const notErrors = this.autoSuggested
      .pipe(filter(data => !!(data && data.length)))
      .subscribe(_ => {
        this.asyncValidation.removeAutosuggestAsyncErr(this.identifier);
      });
    this.subscriptions.push(notErrors);
  }

  toggleAsyncErrors() {
    this.detectAsyncErrors();
    this.detectRemoveAsyncErrors();
  }

  checkPartnerBtnStatus() {
    return combineLatest(
      this.pickedPartner,
      this.isPickedPartnerForbidden
    ).pipe(
      map(
        ([partner, forbidden]) =>
          !!(partner && forbidden === undefined && this.identifier.valid)
      )
    );
  }

  openAddPartnerDialog() {
    this.partnerDialog = this.dialog.open(ModalPartnerComponent);
    this.partnerDialog.afterClosed().subscribe(res => {
      this.ngRedux.dispatch(new ResetNumberExist(null).createAction())
    });
  }

  setNextStep() {
    this.nextStep.emit();
  }

  prefillNewPartner() {
    return this.newPickedPartner
      .pipe(filter(partner => !!partner))
      .subscribe(res => {
        this.identifier.setValue(res.passport);
        this.setNextStep();
        this.partnerDialog.close();
      });
  }

  ngOnInit() {
    const prefillNewPartner = this.prefillNewPartner();
    this.subscriptions.push(prefillNewPartner);
    this.isPartnerInfoVisible = this.setPartnerVisibility();
    this.isCheckButtonDisables = this.checkPartnerBtnStatus();
    this.toggleAsyncErrors();
  }

  ngOnDestroy() {
    unsubscribeAll(this.subscriptions);
  }
}
