import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatStepper } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PartnerService } from '../../../../services/partner/partner.service';
import { Observable, Subscription, timer, combineLatest } from 'rxjs';
import { AsyncValidationsService } from '../../../../../../../core/validations/async-validations.service';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../../../../../core/store/rootStore';
import {
  CheckPartnerNew,
  CheckPartnerNewRestore,
  AddPartnerPhone,
  AddPartnerPhoneRestore,
  VerifyPartnerPhone,
  VerifyPartnerPhoneRestore,
  SaveValidPassportId,
  NotifyInvalidPassportId,
  GetNewPartnerInfo,
  ResetNumberExist
} from '../../../../../../../core/store/partner/partner.actions';
import { filter, first } from 'rxjs/operators';
import { unsubscribeAll } from '../../../../../../../core/untils';
import {
  PASSPORT_REGEX,
  PHONE_REGEX,
  INN_REGEX,
  PHONE_CODE_REGEX,
  PASSPORT_CONDITION

} from '../../../../../../../core/services/partner.service';
import { ValidationTimeoutService } from '../../../../../../../core/services/validation-timeout.service';

const passValidators = [
  Validators.required,
  Validators.minLength(6),
  Validators.maxLength(12),
  Validators.pattern(PASSPORT_CONDITION)
];
const innValidators = [
  Validators.required,
  Validators.minLength(12),
  Validators.maxLength(12),
  Validators.pattern(INN_REGEX)
];
@Component({
  selector: 'app-modal-partner',
  templateUrl: './modal-partner.component.html',
  styleUrls: ['./modal-partner.component.scss']
})
export class ModalPartnerComponent implements OnInit, OnDestroy {
  @select((s : IAppState) => s.partner.isAttemptFailed) attemptedCounter;

  form1Value: FormGroup;
  constructor(
    private errorService : ValidationTimeoutService,
    private ngRedux: NgRedux<IAppState>,
    public dialogRef: MatDialogRef<ModalPartnerComponent>,
    private partnerService: PartnerService,
    private asyncValidation: AsyncValidationsService
  ) {}
  isLinear = true;
  partner = {
    type: 0,
    name: 'John Dou',
    phone_number: null
  };

  timeAfterTimerDie: number;

  partnerType: number;
  form1: FormGroup;
  numberForm: FormGroup;
  attemptError : number = 0;

  errorMess;
  partnerData;
  partnerExistValue : boolean;
  isExist;
  isFailedAttemted;

  s1: Subscription;
  s2: Subscription;
  s3: Subscription;
  s4: Subscription;

  subscriptions = [];
  timerStarted = false;
  tabTitle = 'ВЫБЕРИТЕ ТИП КОНТРАГЕНТА';
  tabs = [
    {
      title   : 'ФИЗЛИЦО',
      disable : false
    },
    {
      title   : 'ЮРЛИЦО',
      disable : false
    }
  ]

  @ViewChild('partnerStepper', { read: MatStepper }) stepper;

  @select((s: IAppState) => s.partner.createdPartnerId) createdPartnerId;
  @select((s: IAppState) => s.partner.isPhoneConfirmed) isPhoneConfirmed;
  @select((s: IAppState) => s.partner.isCodeConfirmed) isCodeConfirmed;
  @select((s: IAppState) => s.partner.partnerIdentity) partnerIdentity;
  @select((s: IAppState) => s.partner.newPickedPartner) newPickedPartner;
  @select((s: IAppState) => s.partner.partnerAlreadyExist) isPartnerExist;


  codeError : any;
  codeValidtiyErr : boolean = false;

  get form1Name() {
    return this.form1.controls['name'];
  }

  get form1Identifier() {
    return this.form1.controls['identifier'];
  }

  get userNumber() {
    return this.numberForm.controls['phone'];
  }

  get phoneCodeField() {
    return this.numberForm.controls['code'];
  }

  generateStepForms() {
    this.form1 = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(100)
      ]),
      identifier: new FormControl('', [...passValidators])
    });

    this.numberForm = new FormGroup({
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern(PHONE_REGEX)
      ])
    });
  }

  previousStep() {
    this.ngRedux.dispatch(new ResetNumberExist(null).createAction())
    this.stepper.previous();
    this.form1.reset();
    this.numberForm.reset();
    this.isFailedAttemted = false;
  }

  addPhoneCodeField() {
    this.numberForm.addControl(
      'code',
      new FormControl('', [
        Validators.required,
        Validators.pattern(PHONE_CODE_REGEX)
      ])
    );
  }

  removePhoneCodeField() {
    this.numberForm.removeControl('code');
  }

  generateAsyncValidatorSubscrubtions() {
    const onPartnerCreated = this.onPartnerCreated();
    const onPartnerError = this.onPartnerError();
    const onPartnerRestore = this.onPartnerRestore();
    const onVerify = this.onVerify();
    const onVerifyError = this.onVerifyError();
    const onVerifyRestore = this.onVerifyRestore();
    const onVerifyCode = this.onVerifyCode();
    const onVerifyCodeError = this.onVerifyCodeError();
    const onVerifyCodeRestore = this.onVerifyCodeRestore();

    [
      onPartnerCreated,
      onPartnerError,
      onPartnerRestore,
      onVerify,
      onVerifyError,
      onVerifyRestore,
      onVerifyCode,
      onVerifyCodeError,
      onVerifyCodeRestore
    ].forEach(sub => {
      this.subscriptions.push(sub);
    });
  }

  savePartnerIdentity() {
    const idField = this.form1Identifier.valueChanges.subscribe(res => {
      const action = this.form1Identifier.valid
        ? new SaveValidPassportId(this.form1Identifier.value).createAction()
        : new NotifyInvalidPassportId({}).createAction();
      this.ngRedux.dispatch(action);
    });
    this.subscriptions.push(idField);
  }

  ngOnInit() {

    this.generateStepForms();
    this.generateAsyncValidatorSubscrubtions();
    this.savePartnerIdentity();
    this.onChanges();

    this.dialogRef.afterClosed().subscribe(() => {
      this.ngRedux.dispatch(new AddPartnerPhoneRestore(null).createAction())
      this.ngRedux.dispatch(new ResetNumberExist(null).createAction())
    })
  }

  onChanges = () => {
    this.errorService.onDetectErrorAllForm(this.form1);
    this.errorService.errorIsShow.subscribe(res => this.errorMess = res);
  }

  ngOnDestroy() {
    if (this.s1) {
      this.s1.unsubscribe();
    }
    if (this.s2) {
      this.s2.unsubscribe();
    }

    unsubscribeAll(this.subscriptions);
  }

  getStorePartnerId() {
    return this.createdPartnerId.pipe(
      filter(id => id !== null && id !== undefined)
    );
  }

  onPartnerCreated() {
    return this.getStorePartnerId().subscribe(_ => {
      if (this.stepper && this.stepper.next) {
        this.stepper.next();
      }
    });
  }

  onPartnerError() {
    return this.createdPartnerId
      .pipe(filter(id => id === null))
      .subscribe(_ => {
        this.asyncValidation.addAutosuggestErr(this.form1Identifier);
      });
  }

  onPartnerRestore() {
    return this.createdPartnerId
      .pipe(filter(id => id === undefined))
      .subscribe(_ => {
        this.asyncValidation.removeAutosuggestAsyncErr(this.form1Identifier);
      });
  }

  addValidCodeListener() {
    const checkCode = this.checkCodeEvent().subscribe(
      ([code, userId, isVerified]) => {
        if (this.phoneCodeField.valid && !isVerified) {
          this.sendCodeToVerify(userId);
        }
      }
    );
    this.subscriptions.push(checkCode);
  }

  onVerify() {
    return this.isPhoneConfirmed
      .pipe(filter(state => state === true))
      .subscribe(_ => {
        this.partner.phone_number = 'test number 555 005 457';
        this.startTimer();
        this.addPhoneCodeField();
        this.addValidCodeListener();
      });
  }
  onVerifyError() {
    return this.isPhoneConfirmed
      .pipe(filter(state => state === false))
      .subscribe(_ => {
        this.asyncValidation.addAutosuggestErr(this.userNumber);
      });
  }

  onVerifyRestore() {
    return this.isPhoneConfirmed
      .pipe(filter(state => state === undefined))
      .subscribe(_ => {
        this.asyncValidation.removeAutosuggestAsyncErr(this.userNumber);
      });
  }
  onVerifyCode() {
    return this.isCodeConfirmed
      .pipe(filter(state => state === true))
      .subscribe(_ => {
        this.resetTimer();
      });
  }
  onVerifyCodeError() {

    return this.isCodeConfirmed
      .pipe(filter(state => state === false))
      .subscribe(_ => {
        this.asyncValidation.addAutosuggestErr(this.phoneCodeField);
        // this.resetTimer();
        this.startTimer();
      });
  }

  onVerifyCodeRestore() {

    return this.isCodeConfirmed
      .pipe(filter(state => state === undefined))
      .subscribe(_ => {
        this.asyncValidation.removeAutosuggestAsyncErr(this.phoneCodeField);
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  switchIdentifierValidations(type: number) {
    const validators = type === 0 ? [...passValidators] : [...innValidators];
    this.form1Identifier.setValidators(validators);
  }

  onPartnerTypeSelect(type: number): void {
    this.partnerType = this.partnerType === type ? null : type;
    this.switchIdentifierValidations(type);

    this.form1.reset();
  }
  restoreNewPartner() {
    this.ngRedux.dispatch(new CheckPartnerNewRestore({}).createAction());
  }

  onSubmitFirstForm(stepper: MatStepper) {
    this.form1Value = this.form1;

    // const dataToSend = this.partnerService.createNewPartnerData(this.form1)
    // const payload = { ...dataToSend, type: this.partnerType };

    // this.partnerData = {
    //   ...payload
    // };

    // this.ngRedux.dispatch(new CheckPartnerNew(payload).createAction());
    // this.getStorePartnerId()
    //   .pipe(first())
    //   .subscribe(res => {
    //     this.stepper.next();
    //     this.restoreSecondState();
    //   });

    this.stepper.next();
  }

  generateValidUserNumber(num: string) {
    return `+7${num}`;
  }

  onSendCodeToClientPhone() {

    const number = this.generateValidUserNumber(this.userNumber.value);

    const dataToSend = this.partnerService.createNewPartnerData(this.form1Value, number)

    const payload = {
      ...dataToSend,
      type : this.partnerType
    }

    this.ngRedux.dispatch(new CheckPartnerNew(payload).createAction());

    this.isPartnerExist.pipe(
        filter(res => res !== undefined)
    ).subscribe(exist => this.partnerExistValue = exist )

    // this.getStorePartnerId()
    //   .pipe(first())
    //   .subscribe(res => {
    //     this.stepper.next();
    //     this.restoreSecondState();
    //   });



    this.getStorePartnerId()
      .pipe(first())
      .subscribe(id => {
        const data = {
          partner_id: id,
          phone_number: this.generateValidUserNumber(this.userNumber.value)
        };
        this.startTimer();

        // Close modal if user type equals 1
        new Promise(res => res(this.ngRedux.dispatch(new AddPartnerPhone(data).createAction())))
          .then(() => {
            if (this.partnerType === 1) {
              this.stepper.next();
              this.onNoClick();
              this.prefillFirstStepWithNewPartner();
              // this.ngRedux.dispatch(new GetNewPartnerInfo(data.partner_id).createAction());
            }
          })
      });
  }

  restoreVerifiedState() {
    this.ngRedux.dispatch(new AddPartnerPhoneRestore({}).createAction());
  }

  restoreSecondState() {
    this.numberForm.reset();
    this.partner.phone_number = null;
    this.removePhoneCodeField();
    this.restoreCodeVerify();
    this.resetTimer();
  }

  restoreCodeVerify() {
    this.ngRedux.dispatch(new VerifyPartnerPhoneRestore({}).createAction());
  }

  generate5MinutesInterval() {
    return Date.now() + 5 * 60 * 1000;
  }

  resetTimer() {
    if (this.s3 && this.s3.unsubscribe) {
      this.s3.unsubscribe();
    }
    this.timeAfterTimerDie = undefined;
    this.timerStarted = false;
  }

  private startTimer() {
    if (!this.timerStarted) {
      const endDate = this.generate5MinutesInterval();
      this.s3 = timer(100, 100).subscribe(() => {
        this.timerStarted = true;
        if (isNaN(this.timeAfterTimerDie) || this.timeAfterTimerDie > 0) {
          return (this.timeAfterTimerDie = endDate - Date.now());
        }
        this.resetTimer();
      });
    }
  }

  checkCodeEvent() {
    return combineLatest(
      this.phoneCodeField.valueChanges,
      this.createdPartnerId.pipe(
        filter(id => !!id),
        first()
      ),
      this.isCodeConfirmed.pipe(first())
    );

  }

  sendCodeToVerify(id) {
    const payload = {
      partner_id: id,
      phone_number: this.userNumber.value,
      code: this.phoneCodeField.value
    };
    this.ngRedux.dispatch(new VerifyPartnerPhone(payload).createAction());

    this.attemptedCounter.pipe(
      filter(res => res === 2)
    ).subscribe(data => this.isFailedAttemted = true)
  }

  prefillFirstStepWithNewPartner() {
    this.partnerIdentity
      .pipe(
        filter(id => !!id),
        first()
      )
      .subscribe(partnerId => {
        this.ngRedux.dispatch(new GetNewPartnerInfo(partnerId).createAction());
      });
  }
}
