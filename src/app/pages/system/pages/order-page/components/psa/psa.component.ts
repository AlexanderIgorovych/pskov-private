import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Subject, merge, Subscription, Observable } from 'rxjs';
import { IAppState } from '../../../../../../core/store/rootStore';
import { select, NgRedux } from '@angular-redux/store';
import { filter, map, mergeMapTo } from 'rxjs/operators';
import { IFile, documentTypes } from '../../../../../../core/services/add-car.service';
import { CameraPhoto } from '../../../../../../core/services/photo.service';
import { SavedPsaDocuments } from '../../../../../../core/store/payment/payment.actions';
import { SaveDocuments, SAVE_DOCUMENTS } from '../../../../../../core/store/add-documents/add-documents.actions';
import { ApiService } from '../../../../../../core/http/api.service';
import { pluck } from 'rxjs/internal/operators/pluck';
import { SaveOrderId } from '../../../../../../core/store/weigh/weigh.action';

@Component({
  selector: 'app-psa',
  templateUrl: './psa.component.html',
  styleUrls: ['./psa.component.scss']
})
export class PsaComponent implements OnInit {

  areFilled: boolean = false;
  filesPsa : IFile[] = [];
  filesChanged = new Subject();

  sPsaSucc : Subscription;
  verifyOrderPsaConf : boolean = false;
  subscriptions = [];
  @select('payment') documentsPsa;

  @Output() tabPageChange = new EventEmitter();

  s1 : Subscription;
  s2 : Subscription;

  @select((s: IAppState) => s.partner.pickedPartner) pickedPartner;
  // @select((s: IAppState) => s.car.pickedCar) pickedCarId;
  @select((s: IAppState) => s.car) car;
  @select((s: IAppState) => s.addDocuments.partnerDocs) partnerDocs;
  @select((s: IAppState) => s.payment.psaDocument) psaDocs;
  @select((s: IAppState) => s.addDocuments) addDocuments;
  @select((s: IAppState) => s.payment) payment;

  individualEntity = () => this.pickedPartner.pipe(filter((res: any) => res && res.type === 0 || res.type === 1));

  constructor(private ngRedux : NgRedux<IAppState>, private apiService : ApiService) { }

  intPass;
  photo;
  partnId;
  idCar;
  client_card;
  payment_type;
  partnType;
  partnLocal;
  partnerData;
  trailer_id : number = null;

  generateFileArray = (name) => {
    const pathArr = [];

    this.addDocuments.subscribe(res => res[name].map(el => pathArr.push(el.path)));

    return pathArr;
  }

  generateDocumentPackByPartner = () => {
    if (this.partnerData.partnLocal === false && this.partnerData.partnType === 0) {
      return {
        psa : this.generateFileArray('psa'),
        requisites             : this.generateFileArray('requisites'),
        international_passport : this.generateFileArray('international')
      }
    }

    if (this.partnerData.partnLocal === true && this.partnerData.partnType === 0) {
      return {
        passport : this.generateFileArray('passport')
      }
    }

    if (this.partnerData.partnType === 1) {
      return {
        ttn : this.generateFileArray('ttn')
      }
    }
  }

  toWeight = () => {

    const orderData = {
      type : 0,
      partner_id : this.partnerData.partnId,
      car_id: this.idCar,
      trailer_id : this.trailer_id,
      payment : {
        type : this.payment_type,
        id : this.client_card
      },
      documents : this.generateDocumentPackByPartner()
    }

    this.apiService.post('/orders', orderData)
      .subscribe(res => this.ngRedux.dispatch(new SaveOrderId(res.data.id).createAction()))

    this.tabPageChange.emit(7)
  }

  psaIndividual = () => {
    return this.filesChanged.pipe(
      mergeMapTo(
        this.individualEntity().pipe(
          filter((res: any) => {
            return res
          }),
          map(() => {
            return (
              !!this.filesPsa.length
            );
          })
        )
      )
    );
  };

  detectTypeOfPayment(type) {
    if (type === 0) {
      return this.payment_type = 0;
    }

    if (type === 1) {
      return this.payment_type = 1;
    }

    if (type === 2) {
      return this.payment_type = 4;
    }
  }

  sendPsa(){
    this.car.subscribe(res => this.idCar = res.pickedCar.id);

    this.car.pipe(
      pluck('autoSuggestedTrailerPicked', 'id'),
      filter(res => res !== undefined)
    ).subscribe(trailer => this.trailer_id = trailer)

    this.pickedPartner.subscribe(res => {
      return this.partnerData = {
        partnId     : res.id,
        partnLocal  : res.local,
        partnType   : res.type
      }
    });


    this.payment.subscribe(res => this.client_card = res.client_card);
    this.payment.subscribe(res => this.detectTypeOfPayment(res.paymentType))



    const data = {
      type : documentTypes.order,
      documents : [
        ...this.filesPsa
      ]
    };

    const keyOfArr = []

    for (let element in data.documents){
      keyOfArr.push(data.documents[element].document_type)
    };

    data['keys'] = keyOfArr;

    /*
      Request to server should be here !!! END OF ORDER;
    */

    this.ngRedux.dispatch(new SavedPsaDocuments(data).createAction());
    this.ngRedux.dispatch({ type : SAVE_DOCUMENTS, payload : data });

    // Undisable button after changed store


    new Promise(resolve => {

      this.addDocuments.pipe(
        pluck('psa'),
        filter(res => res !== undefined)
      ).subscribe(() => resolve())

    }).then(() => {
      this.sPsaSucc = this.documentsPsa
        .subscribe(res => this.verifyOrderPsaConf = res.psaDocument !== undefined ? true : false);
    })
  }

  areDocumentsFilled = () => merge (this.psaIndividual())


  generateFile(data, source: IFile[]) {
    const file = {
      name  : data.result.source.name,
      url   : data.result.img,
      type  : 0,
      source: data.result.source,
      document_type : data.key
    };
    source.push(file);
    this.filesChanged.next();
  }

  deletePhoto(index: number, source: IFile[]) {
    source.splice(index, 1);
    this.filesChanged.next();
  }


  ngOnInit() {
    const change = this.areDocumentsFilled().subscribe((res: boolean) => {
      this.areFilled = res;
    });

    this.subscriptions.push(change);
  }

}
