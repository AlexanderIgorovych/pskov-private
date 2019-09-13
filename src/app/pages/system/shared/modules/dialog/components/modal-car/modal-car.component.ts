import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatStepper } from '@angular/material';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PartnerService } from '../../../../services/partner/partner.service';
import { Observable, Subscription, timer, combineLatest, concat } from 'rxjs';
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
  GetNewPartnerInfo
} from '../../../../../../../core/store/partner/partner.actions';
import { filter, first } from 'rxjs/operators';
import { unsubscribeAll } from '../../../../../../../core/untils';
import {
  PASSPORT_REGEX,
  PHONE_REGEX,
  INN_REGEX,
  PHONE_CODE_REGEX
} from '../../../../../../../core/services/partner.service';
import {
  FindCarMakeByNumber,
  PickCarMake,
  CreateCar,
  CREATE_CAR
} from '../../../../../../../core/store/add-car/add-car.actions';
import { FindCarByNumberRestore, PickCar } from '../../../../../../../core/store/car/car.actions';
import { CameraPhoto } from '../../../../../../../core/services/photo.service';
import {
  IFile,
  AddCarService,
  NewCarRaw
} from '../../../../../../../core/services/add-car.service';
import { REGEX_CAR } from '../../../../../../../core/services/car.service';
import { ValidationTimeoutService } from '../../../../../../../core/services/validation-timeout.service';
import { SAVE_DOCUMENTS } from '../../../../../../../core/store/add-documents/add-documents.actions';
import { pluck } from 'rxjs/internal/operators/pluck';
import { ApiService } from '../../../../../../../core/http/api.service';


@Component({
  selector: 'app-modal-car',
  templateUrl: './modal-car.component.html',
  styleUrls: ['./modal-car.component.scss']
})
export class ModalCarComponent implements OnInit, OnDestroy {
  constructor(
    private errorService : ValidationTimeoutService,
    private ngRedux: NgRedux<IAppState>,
    private asyncValidation: AsyncValidationsService,
    public dialogRef: MatDialogRef<ModalCarComponent>,
    private carService: AddCarService,
    private apiService : ApiService
  ) {}



  isLinear = true;

  errorMess : boolean = false;

  partner = {
    type: 0,
    name: 'John Dou',
    phone_number: null
  };

  timeAfterTimerDie: number;
  typePartner;
  isLocal;

  partnerType: number = null;
  form1: FormGroup;

  s1: Subscription;
  s2: Subscription;
  s3: Subscription;
  s4: Subscription;
  s5: Subscription;

  subscriptions = [];
  timerStarted  = false;
  files     : IFile[] = [];
  filesTtn  : IFile[] = [];
  filesPassport   : IFile[] = [];
  filesInternPass : IFile[] = [];
  filesStatement  : IFile[] = [];
  afterSubmitted : boolean = false;
  isAlreadyExistError : boolean = false;

  tabTitle = 'ВЫБЕРИТЕ ТИП МАШИНЫ';

  tabs = [
    {
      title   : 'МАШИНА ЛОМОСДАТЧИКА',
      disable : false
    },
    {
      title : 'МАШИНА АРЕНДОВАНА "ПСКОВВТОРМЕТ"',
      disable : false
    }
  ]


  get invalidFinal() {

      if (this.typePartner === 0 && this.isLocal) {
        return !this.files.length || !this.filesTtn.length || this.form1.invalid;
      }

      if (this.typePartner === 0 && !this.isLocal) {
        return !this.files.length || !this.filesInternPass.length || !this.filesStatement.length || this.form1.invalid;
      }

      if (this.typePartner === 1) {
        return !this.files.length || !this.filesPassport.length || this.form1.invalid
      }
  }

  @ViewChild('carStepper', { read: MatStepper }) stepper;

  @select((s: IAppState) => s.addCar.autoSuggested) autoSuggested;
  @select((s: IAppState) => s.addCar.pickedCarMake) pickedCarMake;
  @select((s: IAppState) => s.addDocuments) addDocuments;
  @select((s: IAppState) => s.partner.pickedPartner) pickedPartnerValue;


  onNoClick(): void {
    this.dialogRef.close();
  }
  get form1Name() {
    return this.form1.controls['name'];
  }

  get form1Identifier() {
    return this.form1.controls['identifier'];
  }

  generateStepForms() {
    this.form1 = new FormGroup({
      name: new FormControl('', [Validators.required]),
      identifier: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(13),
        Validators.pattern(REGEX_CAR)
      ])
    });
  }

  onDetermineFocus(e : KeyboardEvent){
    (<HTMLInputElement>e.target).value
  }

  previousStep() {
    this.isAlreadyExistError = false;
    this.stepper.previous();
  }

  generateAsyncValidatorSubscrubtions() {}

  searchForCarMake() {
    if (this.form1Name.valid) {
      this.ngRedux.dispatch(
        new FindCarMakeByNumber(this.form1Name.value).createAction()
      );
    }
  }

  setPicketSuggestion(data) {
    this.ngRedux.dispatch(new PickCarMake(data).createAction());
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
    this.pickedPartnerValue.subscribe(res => {
      this.typePartner  = res.type;
      this.isLocal      = res.local
    });
    this.generateStepForms();
    this.generateAsyncValidatorSubscrubtions();
    this.savePartnerIdentity();
    this.toggleAsyncErrors(
      this.form1Name,
      new FindCarByNumberRestore({}).createAction(),
      this.autoSuggested
    );

    this.onChanges();
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

  onPartnerTypeSelect(type: number): void {
    this.partnerType = this.partnerType === type ? null : type;
    this.form1.reset();
  }
  restoreNewPartner() {
    this.ngRedux.dispatch(new CheckPartnerNewRestore({}).createAction());
  }

  onSubmitFirstForm(stepper: MatStepper) {
    this.stepper.next();
  }

  restoreVerifiedState() {
    this.ngRedux.dispatch(new AddPartnerPhoneRestore({}).createAction());
  }

  restoreSecondState() {
    // this.numberForm.reset();
    this.partner.phone_number = null;
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

  isAutosuggestEmpty(data, field) {
    return data !== undefined && !data.length && field.dirty && field.value;
  }

  detectAsyncErrors(field, action, stream) {
    const errors = stream
      .pipe(filter(data => this.isAutosuggestEmpty(data, field)))
      .subscribe(res => {
        this.ngRedux.dispatch(action);
        this.asyncValidation.addAutosuggestErr(field);
      });
    this.subscriptions.push(errors);
  }

  detectRemoveAsyncErrors(field, stream) {
    const notErrors = stream
      .pipe(filter((data: any) => !!(data && data.length)))
      .subscribe(_ => {
        this.asyncValidation.removeAutosuggestAsyncErr(field);
      });
    this.subscriptions.push(notErrors);
  }

  toggleAsyncErrors(field, action, stream) {
    this.detectAsyncErrors(field, action, stream);
    this.detectRemoveAsyncErrors(field, stream);
  }

  detectTypesForSendDocs(){
    // const functionalObj = {};
    //
    // const documentsTypes = ['certificate', 'passport', 'ttn', 'international', 'statement'];
    //
    // documentsTypes.map(type => {
    //   return this.addDocuments.pipe(
    //     pluck(type),
    //     filter(res => res !== undefined)
    //   ).subscribe(res => functionalObj[type])
    // })

    const certificate = this.addDocuments.pipe(
        pluck('certificate'),
        filter(res => res !== undefined)
    )
    const passport = this.addDocuments.pipe(
        pluck('passport'),
        filter(res => res !== undefined)
    )
    const ttn = this.addDocuments.pipe(
      pluck('ttn'),
      filter(res => res !== undefined)
    )
    const international = this.addDocuments.pipe(
      pluck('international'),
      filter(res => res !== undefined)
    )
    const statement = this.addDocuments.pipe(
      pluck('statement'),
      filter(res => res !== undefined)
    )

    if (this.typePartner === 1) {
      return combineLatest(certificate, ttn)
    }

    if (this.typePartner === 0 && this.isLocal){
      return combineLatest(certificate, passport)
    }

    if (this.typePartner === 0 && !this.isLocal){
      return combineLatest(certificate, international, statement);
    }
  }

  getValuesArray(key, data) {
    const newArrData = [];

    for (let element of data) {
      if (element.type === key) {
        newArrData.push(element.path)
      }
    }
    return newArrData;
  }

  parseDataToSend(res, car){
    const dataPrepared = {};

    const data = [...res[0], ...res[1], ...res[2]].filter(element => element !== undefined)

    data.map(element => dataPrepared[element.type] = this.getValuesArray(element.type, data));

    const dataForSend = {
      own_type: this.typePartner,
      brand_id: car.id,
      plate_number: this.form1Identifier.value,
      documents: { ...dataPrepared }
    };

    return dataForSend;
  }

  prefillFirstStepWithNewPartner() {
    this.s4 = this.pickedCarMake
      .pipe(
        filter(res => !!res),
        first()
      )
      .subscribe(car => {

        const data = {
          type: this.partnerType,
          documents: [
            ...this.files,
            ...this.filesTtn,
            ...this.filesPassport,
            ...this.filesStatement,
            ...this.filesInternPass
          ],
        };

        const arrOfkeys = [];

        for (let element in data.documents ){
          arrOfkeys.push(data.documents[element].document_type)
        };


        data['keys'] = arrOfkeys;

        this.ngRedux.dispatch({ type: SAVE_DOCUMENTS, payload: data });

        this.s5 = this.detectTypesForSendDocs()
          .subscribe(res => {
            const dataForCar = this.parseDataToSend(res, car);

            this.apiService.post('/cars', dataForCar)
              .subscribe(
                (res) => {

                  const carPayload = {
                    ...dataForCar,
                    id : res.data.id
                  }
                  this.ngRedux.dispatch(new PickCar(carPayload).createAction());
                  this.onNoClick();
                  // this.nextStep();
                  this.isAlreadyExistError = false;
                  this.afterSubmitted = true;
                  this.s5.unsubscribe();
                  this.s4.unsubscribe()
                },

                (error) => {
                  const errorMess = { ...error };
                    if (errorMess.response.data.error.code === 19) {
                        this.isAlreadyExistError = true;
                    }
                  this.s5.unsubscribe();
                  this.s4.unsubscribe();
                }
            )
          });

      });
  }

  generateFile(data, source: IFile[]) {
    const file = {
      name: data.result.source.name,
      url: data.result.img,
      type: 0,
      document_type : data.key,
      source: data.result.source
    };
    source.push(file);
    // this.carService.generateMultipartForm(source, file.type, file.document_type);
  }
  deletePhoto(index: number, source) {
    source.splice(index, 1);
  }
}
