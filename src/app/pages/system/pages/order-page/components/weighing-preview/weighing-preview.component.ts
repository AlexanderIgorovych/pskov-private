import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { WeighingService, TableData } from '../../../../shared/services/weighing/weighing.service';
import { AxiosResponse } from 'axios';
import { NgRedux, select } from '@angular-redux/store';
import { IWeighState } from '../../../../../../core/store/weigh/weigh.store';
import { LoadTableOnMount, UpdateCurrentTable, EditCurrentTableEdit, UpdateCurrentTableSelected, CreateNewTableRow, OnCreateContainer, MarkIssue } from '../../../../../../core/store/weigh/weigh.action';
import { CarService } from '../../../../../../core/services/car.service';
import { MatDialogRef, MatDialog, MatDialogConfig } from '@angular/material';
import { ConfirmContainerComponent } from '../../../../shared/modules/dialog/components/confirm-container/confirm-container.component';
import { first } from 'rxjs/internal/operators/first';
import { WeigherConfigService } from '../../../../shared/services/weigher-config/weigher-config.service';

interface EditMode {
  allow : boolean,
  id    : number,
  isTare: boolean,
  tableName : string
}

@Component({
  selector: 'app-weighing-preview',
  templateUrl: './weighing-preview.component.html',
  styleUrls: ['./weighing-preview.component.scss']
})
export class WeighingPreviewComponent implements OnInit, OnChanges {



  s1 : Subscription;
  s2 : Subscription;
  s3 : Subscription;
  s4 : Subscription;
  s5 : Subscription;
  s6 : Subscription;
  s7 : Subscription;
  s8 : Subscription;

  // Temprary data. When [back-end] will'be done it gonne be deleted
  amountBigbags = [10, 20];
  typeBigbags   = [1, 2];
  typeAction    = ['Цветмет', 'Чернмет'];
  tareList      = ['Тара 1', 'Тара 2', 'Тара 3'];
  // We use this vriable like data which pass to children view component
  bigbags;
  scrapsList;
  weightList;
  weighWasAdded       : boolean = true;
  isContainerSelected : boolean = false;
  pickedCar;
  currentWeigh;
  isAllowChange;
  idOfTable;
  typeTable;
  cars;
  scrollBool : boolean = false;
  nextContainerModal  : MatDialogRef<ConfirmContainerComponent>;
  valuePatch : boolean = false;
  pickedCutter;
  cuttersList;
  tableTypes  : any[] = ['weighning']
  containerData;

  pageCount : number = 0;

  randomNumber = (max : number, min : number) : number => {
    return Math.random() * (max - min) + min;
  }

  genereteDataTable(){
    return {
        id    : +new Date() * this.randomNumber(5, 95),
        date  : `${new Date().toLocaleDateString()} ${new Date().toLocaleString('ru', {hour : '2-digit', minute: '2-digit' })}` ,
        car   : this.pickedCar || null,
        waste : '-',

        typeScrap   : '-',
        origin      : null,
        weigh       : null,
        tare        : null,
        container   : null,
        weighter    : '-',
        bigbag      : '-',
        typeBigbag  : '-',
        errorWeigh  : null,
        actType     : null,
        newest      : false,
        cutter      : this.pickedCutter || null,
        isIssue     : false
      }
  }

  // Switch Mode to Edit or to Create
  editModeVal : EditMode = { allow : false, id : null, isTare : false, tableName : this.isContainerSelected ? 'container' : 'weighning'  };

  // Also we structure data for sending. First time to parent component, second - to server
  table     : TableData;
  tableList : TableData[];

  // Redux Store Data
  @select('weight') weight;
  @select('car') car;
  @select('partner') partner;

  @Input() recievedData;
  @Input() withCutter  : boolean = false;
  @Input() isDefault = true;

  // ---------- LYFICLES / CONSTUCTOR BLOCK -------

  constructor(
    private weightService : WeighingService,
    private ngRedux       : NgRedux<IWeighState>,
    private carService    : CarService,
    private weighConfigSerive : WeigherConfigService,
    public  dialog        : MatDialog) { }

  /*
    Unfortunately, when site is loaded - ngOnInit works, that's happened, because weigh-page
    isn't a route. And loading table works incorrectly, because car/partner and other data we don't
    have yet. For prevent this incorrect behavior, I used ngOnChanges lyfecicle, which detected what
    page loaded now.
  */

  ngOnChanges(changes : SimpleChanges){
    // Detect current page. Load Table will'be work only when choosed page equals '1'
    if (changes.recievedData.currentValue === 1 && this.withCutter === false) {
      // Create A Table Frame With Basic Data

        // Get Data From Redux Store which will'be push to table
        this.s5 = this.car.subscribe(res => this.pickedCar =  res.pickedCar.plate_number);

        // Load Initial Table with actual data
        this.pushTablesToStore(LoadTableOnMount, 'tableList', 'tableData');
    }

    // This section work only when withCutter === true. It need for cutter component

    if (changes.recievedData.currentValue === 1 && this.withCutter) {

       this.s7 = this.partner.subscribe(res => this.pickedCutter = res.pickedCutter.name);
       this.s8 = this.partner.subscribe(res => this.cuttersList  = res.cutters)

       this.pushTablesToStore(LoadTableOnMount, 'tableList', 'tableData');
    }

   if (changes.recievedData.currentValue === 2 && this.withCutter) {

     this.pickedCar = null;

     this.pushTablesToStore(LoadTableOnMount, 'tableList', 'tableData');
   }
  }


  pushTablesToStore = (action, data, props) => {
    const self = this;
    this.table = this.genereteDataTable();
    // Send this table to redux store.
    new Promise((resolve) => {
      this.ngRedux.dispatch(new action(this.table).createAction());
      resolve()
    })
    .then(() => this.s4 = this.weight.subscribe(res => self[data] = res[props]))
    .then(() => self[data].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()))
    .then(() => self[data][0].car !== null ? this.typeTable = 0 : this.tableList[0].cutter !== null ? this.typeTable = 1 : this.typeTable = 2);
  }


  createContainer = () => {
    this.tableTypes.push('container');
    this.weighWasAdded = true;
    this.valuePatch = true;
    this.isContainerSelected = true;
    this.pushTablesToStore(OnCreateContainer, 'containerData', 'container');
  }

  ngOnInit(): void {
    // Get List Of Bigbags
    this.s1 = this.weightService.getBigbags()
      .subscribe(res => this.bigbags = res.data)

    // Get List Of Weight
    this.s2 = this.weightService.getScaleList()
      .subscribe((res : AxiosResponse) => this.weightList = res.data.items)

    // Get List Of Scraps
    this.s3 = this.weightService.getScraps()
      .subscribe(res => this.scrapsList = res.data);

    this.s6 = this.carService.getCars(0, '0')
      .subscribe((res : AxiosResponse) => this.cars = res.data.items);
  };

  // ---------- FUNCTION BLOCK ----------

  updateTableValue = (e) => {
    const payloadData = {
      ...this.table,
      weigh    : e.weight,
      weighter : e.weighType,
      newest   : true,
      tare     : e.tare ? e.tare : null
    }

    const dispatchData = {
      data : payloadData,
      tableName : !this.isContainerSelected ? 'tableData' : 'container'
    }

    this.ngRedux.dispatch(new UpdateCurrentTable(dispatchData).createAction());
  }

  // Event Emitters Handler
  isChangeAllowed = (e) => this.isAllowChange = e;

  createNewRow    = ()  => {
    this.table = this.genereteDataTable()
    // this.handleScroll();
    this.valuePatch = true;

    const tablePayload = {
      table : this.table,
      isContainer : this.isContainerSelected
    }

    this.ngRedux.dispatch(new CreateNewTableRow(tablePayload).createAction());
  }

  countOfClick = () => {
    this.valuePatch    = false;
    this.weighWasAdded = false;
  }
  // Initialize of edit table. We pass to new-edit-component id and boolean permission

  handleScroll = () => this.scrollBool = !this.scrollBool


  onEditTable = (e) => {
    this.handleScroll();
    this.editModeVal = {
      allow  : true,
      id     : e.id,
      isTare : e.tare === null ? false : true,
      tableName : e.tableName === 'container' ? 'container' : 'tableData'
    };
  };

  handleIssue = data => {
    const payload = {
      data : data.id,
      tableName : data.tableName === 'container' ? 'container' : 'tableData'
    }

    payload.data['isIssue'] = true


    this.ngRedux.dispatch(new MarkIssue(payload).createAction());
  }

  handleChangeSelect = (e) => {
    const data = {
      idTable : this.table.id,
      ...e
    }

    const tablePayload = {
      data : data,
      tableName : !this.isContainerSelected ? 'tableData' : 'container'
    }

    this.ngRedux.dispatch(new UpdateCurrentTableSelected(tablePayload).createAction());
  }

  weighBack = () => this.pageCount = 0;

  editValueHandler = (data) => this.ngRedux.dispatch(new EditCurrentTableEdit({data : data, tableName : data.tableName}).createAction());

  onChangeSubRoute = () => this.pageCount = 1;

  patchVal = (e) => this.valuePatch = e;

  mobileTableHandler = () => this.pageCount = 2;

  // closeDialog() {
  //   this.nextContainerModal.close();
  // }

  // openModalContainer = () => {
  //   this.handleScroll();
  //
  //   setTimeout(() => {
  //         this.nextContainerModal = this.dialog.open(ConfirmContainerComponent, {
  //           width : '200px',
  //           height: '50px'
  //         });
  //         this.nextContainerModal.componentInstance.closed.pipe(first()).subscribe(res => {
  //           this.closeDialog();
  //         });
  //
  //         this.nextContainerModal.componentInstance.confirmed
  //           .pipe(first())
  //           .subscribe(res => {
  //             this.closeDialog();
  //           });
  //       }, 500);
  // }

}
