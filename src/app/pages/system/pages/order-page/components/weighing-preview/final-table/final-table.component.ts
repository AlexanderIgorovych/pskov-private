import { Component, OnInit, Input, SimpleChanges, ViewChild, ElementRef, OnChanges, DoCheck, AfterContentInit, EventEmitter, Output } from '@angular/core';
import { Subscription, combineLatest, merge } from 'rxjs';
import { select, NgRedux } from '@angular-redux/store';
import { FormGroup, FormControl } from '@angular/forms';
import { OnLoadFinallyTableColor, OnLoadFinallyTableBlack, UpdateFinallyTableColor, UpdateFinallyTableBlack, UpdateGarbageData } from '../../../../../../../core/store/weigh/weigh.action';
import { FinallyTableData, WeighingService } from '../../../../../shared/services/weighing/weighing.service';
import { IAppState } from '../../../../../../../core/store/rootStore';
import { map, filter, mergeAll } from 'rxjs/operators';

@Component({
  selector: 'app-final-table',
  templateUrl: './final-table.component.html',
  styleUrls: ['./final-table.component.scss']
})
export class FinalTableComponent implements OnInit, AfterContentInit {

  optionalForm : FormGroup;

  constructor(private ngRedux: NgRedux<any>, private weighService : WeighingService) {
    this.optionalForm = new FormGroup({
      typeGrarbage  : new FormControl(null),
      weighGarbage  : new FormControl(null)
    })
  }

  @Input() selectedPage;

  @ViewChild('inputTd') el : ElementRef;
  @ViewChild('blackTable') blackTable : ElementRef;

  @select('weight') weighStore;

  @select((s : IAppState) => s.weight.tableData) tableData;
  @select((s : IAppState) => s.weight.container) containerData;


  s3 : Subscription;
  s2 : Subscription;
  s1 : Subscription;

  colorMet : any[] = [];
  blackMet : any[] = [];

  colorMetTableData : FinallyTableData[] = [];
  blackMetTableData : FinallyTableData[] = [];

  inputHide       : boolean = false;
  inputHideBlack  : boolean = false;
  validationValue : any = false;

  @Output() backToNewWeigh = new EventEmitter();


  ngOnInit() {
  }


  ngAfterContentInit(){
    this.generateFinalTable();
  }

  generateFinalTable(){
    new Promise(resolve => {
      const dataArr = []
      const tableData = this.tableData.pipe(
        map(val => val),
        filter(res => res !== undefined)
      )
      const container = this.containerData.pipe(
        map(val => val),
        filter(res => res !== undefined)
      );

      merge(tableData, container).pipe(mergeAll())
        .subscribe(res => dataArr.push(res));

        dataArr.map(element => {
          if (element.actType === 'Цветмет') {
            this.colorMet.push({
              id        : +new Date() * this.randomNumber(5, 95),
              typeScrap : element.typeScrap,
              origin    : element.origin,
              weighNet  : null,
              waste     : null,
              weigh     : element.weigh,
              isIssue   : element.isIssue
            });
          };



          if (element.actType === 'Чернмет') {
            this.blackMet.push({
              id        : +new Date() * this.randomNumber(5, 95),
              typeScrap : element.typeScrap,
              origin    : element.origin,
              weighNet  : null,
              waste     : null,
              weigh     : element.weigh,
              isIssue   : element.isIssue
            })
          };

        })
      resolve()
    })
    .then(() => {
      const color = this.colorMet.filter(element => element.isIssue !== true)
      const black = this.blackMet.filter(element => element.isIssue !== true)
      this.ngRedux.dispatch(new OnLoadFinallyTableColor(color).createAction());
      this.ngRedux.dispatch(new OnLoadFinallyTableBlack(black).createAction());
    })
    .then(() => {
      this.s2 = this.weighStore.subscribe(res => this.colorMetTableData = res.colorMetTable)
      this.s3 = this.weighStore.subscribe(res => this.blackMetTableData = res.blackMetTable)
    })
  }

  filterByIssued = (tableArr) => tableArr.filter(element => element.isIssue !== true)



  randomNumber = (max : number, min : number) : number => {
    return Math.random() * (max - min) + min;
  }

  showInput      = () => this.inputHide = true;
  showInputBlack = () => this.inputHideBlack = true;

  sendWeighning = () => {

    this.weighStore.subscribe(res => {

      const tableDataArr  = [];
      const order_id      = res.order_id;

      res.tableData.map(table => {
        tableDataArr.push({
          car_id        : table.car,
          weighter_id   : table.weighter,
          big_bag_id    : table.typeBigbag,
          big_bag_count : table.bigbag,
          origin : table.origin,
          weight : table.weigh,
          container : 1,
          cutter_id : table.cutter_id !== null ? table.cutter_id : null,
          waste     : table.waste,
          pollution_percent : 6,
          scrap_type   : table.typeScrap,
          receipt_type : table.tare !== null ? 2 : 1,
        })
      })

      this.weighService.postWeighnings(order_id, tableDataArr)
    });
  }

  sendWasteToStore = (actionName, el) => {

    const htmlArr = el.nativeElement.getElementsByTagName('input')

    const Inst = actionName;
    const arr = Array.prototype.slice.call(htmlArr);
    const arrToStore = [];

    arr.map(element => {
      arrToStore.push({
        waste : +element.value,
        id    : element.id
      })
    })


    for (let element in arrToStore){
      this.ngRedux.dispatch(new Inst(arrToStore[element]).createAction());
    }
  }

  saveInputValueBlack = () => {
    this.inputHideBlack = false;
    this.sendWasteToStore(UpdateFinallyTableBlack, this.blackTable);
    this.sendResultsToOperator();
  };

  saveInputValue = () => {
    this.inputHide = false;
    this.sendWasteToStore(UpdateFinallyTableColor, this.el);
    this.sendResultsToOperator()
  };

  handleOptionalValue = (e) => {

    const payloadData = {
      [e.ngControl.name]: e.ngControl.value
    }

    this.ngRedux.dispatch(new UpdateGarbageData(payloadData).createAction());
  }

  backToNewWeighHandle = () => this.backToNewWeigh.emit(0);

  sendResultsToOperator = () => {
    const newArr = []
    this.colorMetTableData.map(el => newArr.push(el.waste))
    const newArrCol = [];
    this.blackMetTableData.map(el => newArrCol.push(el.waste));


    const validationCheckBlack = newArrCol.indexOf(null) !== -1 ? false : true
    const validationCheck      = newArr.indexOf(null)    !== -1 ? false : true


    this.validationValue = (validationCheckBlack !== false) && (validationCheck !== false) ;
  }

}
