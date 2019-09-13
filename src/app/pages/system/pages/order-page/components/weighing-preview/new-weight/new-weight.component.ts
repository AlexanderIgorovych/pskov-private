import { Component, OnInit, Input, EventEmitter, Output }           from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgRedux, select }    from '@angular-redux/store';
import { TableData }  from '../../../../../shared/services/weighing/weighing.service';
import { IWeighState } from '../../../../../../../core/store/weigh/weigh.store';
import { LoadTableOnMount } from '../../../../../../../core/store/weigh/weigh.action';
import { Subscription } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material';
import { ConfirmContainerComponent } from '../../../../../shared/modules/dialog/components/confirm-container/confirm-container.component';
import { first } from 'rxjs/internal/operators/first';
import { OnChanges } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { GetPickedCutter } from '../../../../../../../core/store/partner/partner.actions';
import { IAppState } from '../../../../../../../core/store/rootStore';
import { WeigherConfigService } from '../../../../../shared/services/weigher-config/weigher-config.service';


@Component({
  selector: 'app-new-weight',
  templateUrl: './new-weight.component.html',
  styleUrls: ['./new-weight.component.scss']
})
export class NewWeightComponent implements OnInit, OnChanges {


  // This component is just view. That's why we recieve data from parent component.
  // And didsplay it here

  s1 : Subscription;

  @Input() defaultCar;
  @Input() displayScraps;
  @Input() displayAmountBigs;
  @Input() displayTypeAction;
  @Input() displayListBigsList;
  @Input() displayWeighList;
  @Input() displayTypeWeigh;
  @Input() displayTares;
  @Input() carsList;
  @Input() cuttersList;
  @Input() patch;

  @Input() editMode;
  @Input() scroll;
  @Input() tableType;

  valueChecked: number = 0;

  // Forms
  formWeigh   : FormGroup;
  scrapsForm  : FormGroup;
  pickedWeighter;

  // Event Emitters
  @Output() updateTable       = new EventEmitter();
  @Output() allowChangeTable  = new EventEmitter();
  @Output() editValueScrap    = new EventEmitter();
  @Output() changedSelect     = new EventEmitter();
  @Output() scrollEmit        = new EventEmitter();
  @Output() valueRetPatch     = new EventEmitter();
  @Output() handleClickCount  = new EventEmitter();
  @Output() handleNewRow      = new EventEmitter();


  currWeigh   : any  = null;
  sendedWeigh : boolean = false;
  isEditAllow : boolean = false;

  s2 : Subscription;


  @Input() wasWeighAdded;

  constructor(private ngRedux : NgRedux<IWeighState>, private weighConfigSerive : WeigherConfigService,) {

    // Form Group For Weigh Form (first form)
    this.formWeigh = new FormGroup({
      choosedWeigh : new FormControl(null, [Validators.required]),
      weigh        : new FormControl(null,
        [
          Validators.pattern(/^[0-9]{1,3}[.]{1}[0-9]{1,2}$/),
          Validators.required
        ],
      ),
      tare : new FormControl(null)
    });

    // Form Group for form which display when type of weighing equals scrap
    this.scrapsForm = new FormGroup({
      actType   : new FormControl(null, [Validators.required]),
      typeScrap : new FormControl(null, [Validators.required]),
      bigbag    : new FormControl(null),
      car       : new FormControl(null, [Validators.required]),
      typeBigbag: new FormControl(null),
      cutter    : new FormControl(null)
    });
  };

  ngOnInit(){}

  // get choosedWeigh(){
  //   return this.formWeigh.controls.choosedWeigh.value;
  // }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.scroll) {
      if (changes.scroll.currentValue === true){
        setTimeout(() => {
          this.scrollToTop();
        }, 0)
      }
    }

    if (changes.patch !== undefined){
      if (changes.patch.currentValue === true){
        this.scrapsForm.patchValue({
          actType   : null,
          typeScrap : null,
          bigbag    : null,
          car       : null,
          typeBigbag: null,
          cutter    : null
        })

        setTimeout(() => {
          this.valueRetPatch.emit(false);
        }, 200)
      }
    }
  }

  /*
    After submit, form push data to redux store.
    Table Data Component Recieve this data from store and update table value (!)
  */

  updateTableDataFirst = () => {

    const weighData = {
      weighType : this.formWeigh.controls.choosedWeigh.value,
      weight    : this.formWeigh.controls.weigh.value,
      tare      : this.formWeigh.controls.tare.value
    }


    this.updateTable.emit(weighData);

    // Set initial state after dispatching
    this.isEditAllow = false;

    this.formWeigh.patchValue({
          choosedWeigh : null,
          weigh : null,
          tare  : null
        });

    this.allowChangeTable.emit(true);
  };

  get weighChoosed () {
    return this.formWeigh.controls['choosedWeigh'];
  }

  get weighValue () {
    return this.formWeigh.controls['weigh'].value;
  }

  get carValue () {
    return this.scrapsForm.controls['car'].value
  }

  get cutterValue(){
    return this.scrapsForm.controls['cutter'].value
  }

  get tareValue () {
    return this.formWeigh.controls['tare'].value;
  }

  getCurrentWeigh = () => {

    const { value }     = this.formWeigh.controls.choosedWeigh;
    const weighterArr   = this.displayWeighList.filter(weigh => weigh.id === value);
    this.pickedWeighter = weighterArr[0];

    if (this.wasWeighAdded) {

      this.formWeigh.patchValue({
        weigh : this.weighConfigSerive.parseToTonn(413.12)
      });
      this.handleClickCount.emit();
    } else {
      this.handleClickCount.emit();
      this.handleNewRow.emit();
      this.formWeigh.patchValue({
        weigh : this.weighConfigSerive.parseToTonn(413.12)
      });
    }

  };

  scrollToTop = () => {
    const element = document.getElementById('weigh-wrapper');
    element.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    this.scrollEmit.emit();
  }

  // Edit Table Switcher

  onEditChange = () => this.isEditAllow = true;

  // Edit Table Value Submitted

  submitEditScrap = (id, tableName) => {

    let payloadData

    if (this.tableType === 1){
      const idPicked     = this.scrapsForm.controls.cutter.value
      const findNameById = this.cuttersList.filter(el => el.id === idPicked)

      payloadData  = { ...findNameById[0] }

      this.ngRedux.dispatch(new GetPickedCutter(payloadData).createAction());
    }

    const formDataPayload = {
      idTable   : id,
      typeScrap : this.scrapsForm.controls.typeScrap.value,
      bigbag    : this.scrapsForm.controls.bigbag.value,
      car       : this.scrapsForm.controls.car.value,
      typeBigbag: this.scrapsForm.controls.typeBigbag.value,
      actType   : this.scrapsForm.controls.actType.value,
      cutter    : this.tableType === 1 ? payloadData.name : null,
      tableName : tableName
    }


    this.editValueScrap.emit(formDataPayload);

    this.scrapsForm.patchValue({
      typeScrap  : null,
      bigbag     : null,
      car        : null,
      actType    : null,
      typeBigbag : null,
      cutter     : null
    });

    this.setIntialMode()
  }

  // Switch Edit Mode to Default

  setIntialMode = () => this.editMode = {
    ...this.editMode,
    isTare : false,
    allow : false
  };

  // Handle onChange event and push selected data to parent component, where it will'be push to redux

  handleChangeInputs = (elementType) => {

    if (elementType.ngControl.name === "typeBigbag") {

      const value = this.displayListBigsList.filter(element => element.id === elementType.ngControl.value)
      const payloadData = {
        [elementType.ngControl.name] : value[0]
      }
      
      this.changedSelect.emit(payloadData)
    } else {
      const payloadData = {
        [elementType.ngControl.name] : elementType.ngControl.value
      }

      this.changedSelect.emit(payloadData)
    }
  }

  // Change state of weigh type. It need for display different pages depends on answer
  handleChoosedWeigh = (e) => e.target.value === 'scrap' ? this.valueChecked = 0 : this.valueChecked = 1;


}
