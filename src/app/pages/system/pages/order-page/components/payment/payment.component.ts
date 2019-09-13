import { Component, OnInit, Output, EventEmitter, Input, OnDestroy } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '../../../../../../core/store/rootStore';
import { Observable, merge, Subscription } from 'rxjs';
import {
  PickPaymentType,
  SavePaymentDocuments,
  SAVE_PAYMENT_DOCUMENTS,
  SAVE_PARTNER_CARD,
  SaveClientCard
} from '../../../../../../core/store/payment/payment.actions';
import { RawDocumentsData, PaymentService } from '../../../../../../core/services/payment.service';
import { filter, pluck, tap, map } from 'rxjs/operators';
import { SAVE_DOCUMENTS } from '../../../../../../core/store/add-documents/add-documents.actions';
import { ApiService } from '../../../../../../core/http/api.service';
import { AsyncErrorHandlerService } from '../../../../shared/services/async-error-handler.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  constructor(
    private apiService : ApiService,
    private paymentService : PaymentService,
    private asyncErrorService : AsyncErrorHandlerService,
    private ngRedux: NgRedux<IAppState>) {}

  cardsValueBool : boolean;
  photo;
  requisites;

  tabTitle = 'УКАЖИТЕ СПОСОБ ОПЛАТЫ';
  tabs = [
    {
      title : 'НАЛИЧНЫЕ СРЕДСТВА',
      disable : false
    },
    {
      title : 'НА КАРТУ КЛИЕНТА',
      disable : false
    },
    {
      title : 'ЧЕРЕЗ QIWI',
      disable : false
    },
  ]

  @select((s: IAppState) => s.payment.paymentType) pickedTab: Observable<
    number
  >;

  @select((s : IAppState) => s.payment.documentsConfirmed) confirmed;

  @select((s: IAppState) => s.partner.pickedPartner) partner;
  @select((s: IAppState) => s.addDocuments) addDocumentsStore;

  s1 : Subscription;

  partnerCards = this.partner.pipe(
    filter(res => !!res),
    pluck('cards')
  );

  partnerId = this.partner.pipe(
    filter(res => !!res),
    pluck('id')
  )

  isReadyClient = false;

  subpageData = 0;
  pickedValue;
  cacheState = false;
  confirmedVerif = false;
  sendedDocs = false;

  isCardExistError = false;

  @Output() nextStep = new EventEmitter();

  onTypeSelect(type: number) {
    this.isCardExistError = false;
    this.ngRedux.dispatch(new PickPaymentType(type).createAction());
  }

  // Change Subpage Data. It need for moving to other subpage
  // with payment. Child component uses subpageData value for
  // determining current page
  changeSubData      = () => this.subpageData = this.subpageData + 1;
  // The same behavior. But id of subpage goes from subpage.
  handleSubpageLocal = e  => this.subpageData = e;

  handleResultsVerif = e  => this.confirmedVerif = e;


  declareDisable = e => {
    const newArr = [];

    this.tabs.filter(tab => {
      tab.title !== e ? newArr.push(tab) : newArr.push({
        title : e,
        disable : true
      })

      return this.tabs = newArr;
    })
  };


  addNewCard(data) {
    let partner;
    this.partnerId.subscribe(res => partner = res);
      this.apiService.post('/cards', {
        partner_id : partner,
        documents : {
          photo : data.photo,
          requisites : data.requisites
        }
      })
      .subscribe(
        (res) => {
          this.isCardExistError = false;
          this.ngRedux.dispatch(new SaveClientCard(res.data.id).createAction())
          this.isReadyClientHandle()
          this.s1.unsubscribe();
        },
       (error) => {
          this.isCardExistError = this.asyncErrorService.errorHandler(error, 26);
          this.s1.unsubscribe();
       }
      )
  }


  sendPhotos(data) {
    this.pickedTab.subscribe(res => this.pickedValue = res)

    if (this.pickedValue === 1) {
      const payloadData = {
        type : 1,
        documents : [
          ...data.cardFace,
          ...data.requisites
        ]
      }

      const arrKeys = [];

      for (let element in payloadData.documents) {
        arrKeys.push(payloadData.documents[element].document_type)
      }

      payloadData['keys'] = arrKeys;
      // const action = { type: SAVE_PAYMENT_DOCUMENTS, payload: data };
      new Promise(resolve => {
        this.ngRedux.dispatch({ type : SAVE_DOCUMENTS, payload : payloadData });
        this.sendedDocs = true;
        resolve()
      })
      .then(() => {
        const arrPhoto = [];
        const arrReq = [];
        const mergedData = merge(
          this.addDocumentsStore.pipe(
            pluck('photo'),
            filter(res => res !== undefined),
          ),
          this.addDocumentsStore.pipe(
            pluck('requisites'),
            filter(res => res !== undefined),
          )
        )
        this.s1 = mergedData.subscribe(res => {

          for (let element in res) {
            if (res[element].type === 'photo')      arrReq.push(res[element].path)
            if (res[element].type === 'requisites') arrPhoto.push(res[element].path)
          }
          if (arrPhoto.length >= 1 && arrReq.length >= 1) {

            return this.addNewCard({ photo : arrPhoto, requisites : arrReq })
          }
        })

      })
    }
  }

  changeClientDocs = () => this.confirmed.subscribe(res => res.documentsConfirmed);

  isReadyClientHandle = () => this.isReadyClient = true;


  // Handle Value Change. If value exist in the store - user will'be move
  // to other step.
  handleCard = e => this.cardsValueBool = e !== undefined ? true : false;


  next() {
    this.nextStep.emit();
  }

  requestPay() {
    this.cacheState = true;
  }

  ngOnInit() {}
}
