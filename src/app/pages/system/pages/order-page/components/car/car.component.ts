import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  Input
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { ModalCarComponent } from '../../../../shared/modules/dialog/components/modal-car/modal-car.component';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators
} from '@angular/forms';
import { AutoSuggestOption } from '../../../../../../shared/components/autosuggets/autosuggets.component';
import { select, NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../../../../core/store/rootStore';
import { Observable } from 'rxjs';
import {
  FindCarByNumber,
  FindCarByNumberRestore,
  PickCar,
  FindTrailerByNumberRestore,
  FindTrailerByNumber,
  PickTrailer,
  CheckCar,
  CheckTrailer
} from '../../../../../../core/store/car/car.actions';
import { AsyncValidationsService } from '../../../../../../core/validations/async-validations.service';
import { filter, first, pluck } from 'rxjs/operators';
import { unsubscribeAll } from '../../../../../../core/untils';
import { ValidationTimeoutService } from '../../../../../../core/services/validation-timeout.service';

// tslint:disable-next-line:max-line-length
const REG_EX = /^(([0-9]|[A-Za-z]){2}\s)?([A-Za-z]{1,4}\s)? [0-9]{3,4} (((\s|[-]{1})[0-9]{1,3})?(\s[A-Za-z]{2})?)|((\s[A-Za-z]{1,2})?((\s|[-]{1})[0-9]{1,2})?)?$/;

interface ICar {
  own_type: number;
  plate_number: string;
}

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit, OnDestroy {
  car: ICar = {
    own_type: null,
    plate_number: null
  };

  errorMess : boolean = false;

  form1: FormGroup;
  emptyCarPlaceholder = 'Введите номер машины';
  emptyTralierPlaceholder = 'Введите номер прицепа (если есть)';
  subscriptions = [];
  tabTitle = 'ВЫБЕРИТЕ ТИП МАШИНЫ';
  tabs = [
    {
      title: 'МАШИНА «ПСКОВВТОРМЕТ»',
      disable : false
    },
    {
      title: 'МАШИНА ЛОМОСДАТЧИКА',
      disable : false,
    },
    {
      title : 'МАШИНА АРЕНДОВАНА «ПСКОВВТОРМЕТ»',
      disable : false,
    }
  ]

  tabsModified = [
    {
      title: 'МАШИНА «ПСКОВВТОРМЕТ»',
      disable : false
    },
    {
      title: 'МАШИНА АРЕНДОВАНА «ПСКОВВТОРМЕТ»',
      disable : false,
    }
  ]

  constructor(
    private dialog: MatDialog,
    private errorService : ValidationTimeoutService,
    private fb: FormBuilder,
    private ngRedux: NgRedux<IAppState>,
    private asyncValidation: AsyncValidationsService
  ) {
    this.form1 = this.generateCarForm();
  }

  @Output() nextStep = new EventEmitter();

  // Type car component

  @Input() typeComponent : string = 'default';

  @select((s: IAppState) => s.car.autoSuggested) autoSuggested: Observable<any>;
  @select((s: IAppState) => s.car.pickedCar) pickedCar: Observable<any>;
  @select((s: IAppState) => s.car.isPickedCarForbidden)
  isPickedCarForbidden: Observable<boolean>;

  @select((s: IAppState) => s.car.autoSuggestedTrailers)
  autoSuggestedTrailers: Observable<any>;
  @select((s: IAppState) => s.car.autoSuggestedTrailerPicked)
  autoSuggestedTrailerPicked: Observable<any>;
  @select((s: IAppState) => s.car.isPickedTrailerForbidden)
  isPickedTrailerForbidden: Observable<boolean>;

  get form1Plate() {
    return this.generatePlateNumGetter(this.form1);
  }

  get form1Trailer() {
    return this.form1.controls['trailer_plate_number'];
  }

  generatePlateNumGetter(form: FormGroup) {
    return form ? form.controls['plate_number'] : new FormControl();
  }

  generateCarForm(withTrailer = true) {
    const form = this.fb.group({
      plate_number: ['', [Validators.required]]
    });
    if (withTrailer) {
      form.addControl('trailer_plate_number', new FormControl(''));
    }
    return form;
  }

  addTrailerNumberField() {
    if (!this.form1.controls.trailer_plate_number) {
      this.form1.addControl('trailer_plate_number', new FormControl(''));
    }
  }

  switchTrailerField(type) {

    if (this.typeComponent === 'default') {
      type === 0
        ? this.form1.removeControl('trailer_plate_number')
        : this.addTrailerNumberField();
    }

    if (this.car.own_type === 1 && type !== 1) {
      this.toggleAsyncErrors(
        this.form1Trailer,
        new FindTrailerByNumberRestore({}).createAction(),
        this.autoSuggestedTrailers
      );
    }
  }

  /*
    Maybe exist better approach, but it better than if statement. Function detect type of car, because origin types,
    depends on tabs order.
  */

  onTypeDetect(type){

    const typesArrDefault = [2, 0, 1];
    const typesArrNonDef  = [2, 1];

    return this.typeComponent === 'default' ? typesArrDefault[type] : typesArrNonDef[type];
  }

  onChangeCarType(type) {

    const correctType = this.onTypeDetect(type);

    if (this.car && this.car.own_type === correctType) {
      return (this.car.own_type = null);
    }

    this.switchTrailerField(correctType);
    this.restoreSearch();
    this.car.own_type = correctType;
    this.form1.reset();
    return (this.car.own_type = correctType);
  }

  restoreSearch() {
    this.ngRedux.dispatch(new FindCarByNumberRestore({}).createAction());
    this.ngRedux.dispatch(new FindTrailerByNumberRestore({}).createAction());
  }

  restoreSearchCar(){
    this.ngRedux.dispatch(new FindCarByNumberRestore({}).createAction());
  }

  searchForCar(data: string) {
    if (this.autoSuggestedTrailerPicked !== undefined) {
      this.restoreSearchCar();
    }
    if (this.form1Plate.valid) {
      const payload = { number: data, type: this.car.own_type };
      this.ngRedux.dispatch(new FindCarByNumber(payload).createAction());
    }
  }
  setPicketSuggestion(data: AutoSuggestOption) {
    this.ngRedux.dispatch(new PickCar(data).createAction());
  }

  restoreTrailerSearch() {
    this.ngRedux.dispatch(new FindTrailerByNumberRestore({}).createAction());
  }
  searchForTrailer(data: string) {
    this.restoreTrailerSearch();
    if (this.form1Trailer.valid) {
      const payload = { number: data, type: this.car.own_type };
      this.ngRedux.dispatch(new FindTrailerByNumber(payload).createAction());
    }
  }
  setPicketTrailerSuggestion(data: AutoSuggestOption) {
    this.ngRedux.dispatch(new PickTrailer(data).createAction());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCarComponent);

    dialogRef.afterClosed().subscribe(result => {
        dialogRef.componentInstance.isAlreadyExistError = false;
        if (dialogRef.componentInstance.afterSubmitted === true) {
          this.pickedCar.pipe(pluck('id')).subscribe(res => {
            if (res !== undefined) {
              this.nextStep.emit()
            }
          })
          dialogRef.componentInstance.afterSubmitted = false;
        }
    });
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

  checkCar() {

    this.pickedCar
      .pipe(
        filter(car => !!car),
        first()
      )
      .subscribe(res => {
        this.ngRedux.dispatch(new CheckCar(res.blocked).createAction());
      });
  }

  checkTrailer() {
    this.autoSuggestedTrailerPicked
      .pipe(
        filter(car => !!car),
        first()
      )
      .subscribe(res => {
        this.ngRedux.dispatch(new CheckTrailer(res.blocked).createAction());
      });
  }

  notifyNextStep() {
    this.nextStep.emit();
  }

  ngOnInit() {
    this.toggleAsyncErrors(
      this.form1Plate,
      new FindCarByNumberRestore({}).createAction(),
      this.autoSuggested
    );
    this.toggleAsyncErrors(
      this.form1Trailer,
      new FindTrailerByNumberRestore({}).createAction(),
      this.autoSuggestedTrailers
    );

    this.onChanges();
  }

  onChanges = () => {
    this.errorService.onDetectErrorAllForm(this.form1);
    this.errorService.errorIsShow.subscribe(res => this.errorMess = res);
  }

  ngOnDestroy() {
    unsubscribeAll(this.subscriptions);
  }
}
