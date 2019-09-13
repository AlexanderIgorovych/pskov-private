import { Validators }  from '@angular/forms';
import { FormGroup }   from '@angular/forms';
import { FormControl } from '@angular/forms';
import { IAppState }   from '../../../../../../../core/store/rootStore';
import { CardService } from '../../../../../shared/services/card/card.service';
import { Card }        from '../../../../../../../shared/entitys/cards.entity';
import { Order }       from '../../../../../../../core/services/order.service';
import { OrderQuery }  from '../../../../../../../core/store/order/order.query';

import { ApiService }    from '../../../../../../../core/http/api.service';
import { GetPickedCard } from '../../../../../../../core/store/partner/partner.actions';
import { filter, mergeMapTo, map, debounceTime }        from 'rxjs/operators';

import { PartnerAutouggestValidation }  from '../../../../../../../core/validations/partner-autosuggest.validators';
import { Subscription, Observable, Subject, merge }     from 'rxjs';
import { NgRedux, select }              from '@angular-redux/store';
import { Component, OnInit, OnDestroy, Output, EventEmitter, Input,  } from '@angular/core';
import axios from 'axios';
import { PhotoSection } from '../client-card/client-card.component';
import { photosTabs } from '../../../../../../../shared/components/add-card-photo/add-card-photo.component';
import { IFile, documentTypes } from '../../../../../../../core/services/add-car.service';
import { MatDialogRef, MatDialog } from '@angular/material';
import { SkipDocumentsComponent } from '../../../../../../../shared/components/skip-documents/skip-documents.component';
import { CameraPhoto } from '../../../../../../../core/services/photo.service';
import { SavePaymentDocumentsSuccess, VerificationResult, SaveOrderDocuments, AddedNumberQiwi, SaveNumberClient, SavePartnerCard, SaveClientCard } from '../../../../../../../core/store/payment/payment.actions';
import { PHONE_REGEX } from '../../../../../../../core/services/partner.service';
import { SAVE_DOCUMENTS } from '../../../../../../../core/store/add-documents/add-documents.actions';
import { ValidationTimeoutService } from '../../../../../../../core/services/validation-timeout.service';
import { AsyncErrorHandlerService } from '../../../../../shared/services/async-error-handler.service';

@Component({
  selector: 'app-qiwi-card',
  templateUrl: './qiwi-card.component.html',
  styleUrls: ['./qiwi-card.component.scss']
})
export class QiwiCardComponent implements OnInit, OnDestroy {


  // Subscriptions For Qiwi Cards
  s1 : Subscription;
  s2 : Subscription;
  s3 : Subscription;
  // Subscription for Phone NUmbers
  s4 : Subscription;
  s5 : Subscription;

  sNewQiwi  : Subscription;
  sDocsSucc : Subscription;
  sPaymDoc  : Subscription;



  // Subpage state for determine which particular page should be loaded

  @Input() subpage : number;

  // Form Properties & Values
  form        : FormGroup;
  formNumber  : FormGroup;

  formVerifWay     : FormGroup;
  formVerifyNumber : FormGroup;

  // Event Emitters block. Each event output action to parent comp
  @Output() subpageChangeLocal = new EventEmitter()
  @Output() nextStepHandle     = new EventEmitter();
  @Output() pickedCardsValue   = new EventEmitter();
  @Output() resultOfVer        = new EventEmitter();
  @Output() disableBtnEvent    = new EventEmitter();

  newCardQiwi;
  choosedWay;
  cardsValues;
  cardsNumber;
  errorMess;
  isAlreadyExError;

  selectedWay   : number = 1;
  confirmedBtn  : any;
  partnerId     : string;
  filesTtn      : IFile[] = [];
  files         : IFile[] = [];
  filesCard     : IFile[] = [];
  filesOrder    : IFile[] = [];
  filesEnvelope : IFile[] = [];
  verifConfirmed: boolean;

  numberSaved = false;
  orderFilled = false;
  clientSubm  = false;
  areFilled   = false;

  verifyOrderDocsConf : boolean = false;
  paymentVerification : boolean = false;
  verificationBool    : boolean = false;
  numberVerified      : boolean = false;

  skipDialog: MatDialogRef<SkipDocumentsComponent>;

  subscriptions = [];
  qiwiDocs      = [];

  @select('partner') partner;
  @select('payment') documentsConfirmed;

  @select((s: IAppState) => s.partner.pickedPartner) pickedPartner;
  @select((s: IAppState) => s.payment) payment;
  @select((s: IAppState) => s.addDocuments) addDocuments;

  filesChanged = new Subject();

  // Buid Form in Counstuctor
  constructor(
    private apiService  : ApiService,
    private errorService: ValidationTimeoutService,
    private dialog      : MatDialog,
    private order       : OrderQuery,
    private ngRedux     : NgRedux<IAppState>,
    private cardService : CardService,
    private asyncErrorService : AsyncErrorHandlerService,
  ) {

    // Constructor for form with list of qiwi cards
    this.form      = new FormGroup({
      phone_number : new FormControl(null, [Validators.required])
    });

    // Constructor for form with number of partner
    this.formNumber  = new FormGroup({
      partner_number : new FormControl(null, [Validators.required])
    });

    // Constructor for form with list of verification way
    this.formVerifWay = new FormGroup({
      partNumbWay : new FormControl(null),
      onCway      : new FormControl(null)
    });

    // Constructor for form with adding number
    this.formVerifyNumber = new FormGroup({
      verifyNumb  : new FormControl(null,
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern((/^[0-9]{10}$/))
      ])
    });

  };

  get verifyN() {
    return this.formVerifyNumber.controls['verifyNumb'];
  };

  onChangeRadio(e){
    if (e.value === 'numb-way') {
      this.selectedWay = 1;
    }

    else if (e.value === 'one-c') {
      this.selectedWay = 2;
    }
  }

  // Change Supbage. Recieves number of page and emit it to parent component
  toOrderPay = (page : number) => this.subpageChangeLocal.emit(page);

  resetNumber = () => {
    this.formVerifyNumber.reset();
    this.numberVerified = false;
  }

  disableBtn = (e : string) => {
    this.disableBtnEvent.emit(e);
    this.toOrderPay(-1);
  }

  legalEntity = () => {
    return this.filesChanged.pipe(
      mergeMapTo(
        this.pickedPartner.pipe(
          filter((res: any) => res && res.type === 1),
          map(res           => !!this.filesTtn.length)
        )
      )
    );
  };

  individualEntity = () => this.pickedPartner.pipe(filter((res: any) => res && res.type === 0));

  localIndividual = () => {
    return this.filesChanged.pipe(
      mergeMapTo(
        this.individualEntity().pipe(
          map(res => {
            return !! this.files.length;
          })
        )
      )
    );
  };

  cardIndividual = () => {
    return this.filesChanged.pipe(
      mergeMapTo(
        this.individualEntity().pipe(
          map(res           => !!this.filesCard.length && !! this.filesEnvelope.length)
        )
      )
    );
  };

  orderInividual = () => {
    return this.filesChanged.pipe(
      mergeMapTo(
        this.individualEntity().pipe(
          map(res           => !!this.filesOrder.length
          )
        )
      )
    );
  };

  // Check if all photo consist in input

  areDocumentsFilled = () => merge (
    this.legalEntity(),
    this.localIndividual(),
    this.cardIndividual(),
  )

  areDocumentOrdrer = () => merge (
    this.orderInividual()
  )

  // On submit form with verification number

  generateFile = (data, source: IFile[]) => {

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

  deletePhoto = (index: number, source: IFile[]) => {
    source.splice(index, 1);
    this.filesChanged.next();
  }

  invokeSkipModal = () => {
    this.skipDialog = this.dialog.open(SkipDocumentsComponent);

    this.skipDialog.componentInstance.cancel.subscribe(_ => {
      this.skipDialog.close();
    });

    this.skipDialog.componentInstance.skip.subscribe(_ => {
      this.skipDialog.close();
    });
  };

  resetDataNumber = () => {
    this.numberVerified = false;
    this.formVerifyNumber.patchValue({
      verifyNumb : null
    })
  }

  // PSA Redirect Func

  goToPsa = () => this.nextStepHandle.emit();

  generateCorrectNumber = (val) => `+7${val}`

  verificationRes = (e) => {
    if (e.target.id === 'allowVer') {
      this.ngRedux.dispatch(new VerificationResult(true).createAction())
    }

    else if (e.target.id === 'denyVer') {
      this.ngRedux.dispatch(new VerificationResult(false).createAction())
    }

    this.s5 = this.documentsConfirmed
      .subscribe(res => this.paymentVerification = res.paymentVerification);
  }



  // Actions after mounted component
  ngOnInit() {
    // Get Infomration About Partner
    this.s2 = this.partner
      .subscribe(res => this.partnerId = res.pickedPartner.id)

    // Dispatch data to store. In the future it helps make order
    this.s1 = this.cardService.getQiwiList(this.partnerId)
      .subscribe((res : Card[]) => {
        this.cardsValues = res
      });

    // Look at changed in documents block
    const change = this.areDocumentsFilled().subscribe((res: boolean) => {
      this.areFilled = res;
    });

    const orderChanged = this.areDocumentOrdrer().subscribe((res: boolean) => {
      this.orderFilled = res;
    });

    this.subscriptions.push(change);

    this.onChanges();
   };

   // Form show error alert only after debounce time

   onChanges = () => {
     this.errorService.onDetectErrorAllForm(this.formVerifyNumber);
     this.errorService.errorIsShow.subscribe(res => this.errorMess = res);
   }

  /* This factory function for dispatching and updating DOM. It recieve 3 params - payload,
      name of action from redux action and callback. It's very simple function. But it helps
      write a less code
  */
  factoryOfSubmitCard = (payload : any, actionName : any, callBack : Function) => {
    const payloadData = payload;

    const Inst = actionName

    const action = {
      instance : new Inst(payloadData)
    }

    return new Promise(resolve => {
      this.ngRedux.dispatch(action.instance.createAction());
      resolve();
    })
    .then(() => callBack())
  }

  // ORDER STATEMENT STORE UPDATER

  onOrderStatement = () => {
    const payloadData = {
      type : documentTypes.card,
      documents : [
        ...this.filesOrder
      ]
    }

    payloadData['keys'] = [payloadData.documents[0].document_type];

    this.ngRedux.dispatch({ type : SAVE_DOCUMENTS, payload : payloadData })
    this.verifyOrderDocsConf = true;
  }

  // CLIENT CARD STORE UPDATER

  onSubmitClientCard = () => this.factoryOfSubmitCard(this.form.value.phone_number, SaveClientCard, () => {
    this.s3 = this.payment
      .subscribe(res => {
        this.clientSubm = true;
        this.pickedCardsValue.emit(res.client_card)
      })
  });

  // PARTNER PHONE STORE UPDATER

  onSubmitPartNumber = () => this.factoryOfSubmitCard(this.formNumber.value.partner_number, SavePartnerCard, () => {

    this.numberSaved = true;

    this.s3 = this.documentsConfirmed
      .subscribe(res => this.cardsNumber = res.partner_card)
  });

  onPhotoCardSubmit = () => {
    const data = {
      type : documentTypes.card,
      documents : [
        ...this.filesCard,
        ...this.filesEnvelope
      ]
    }

    const arrOfKeys = [];

    for (let el in data.documents) {
      arrOfKeys.push(data.documents[el].document_type)
    }

    data['keys'] = arrOfKeys;

    this.ngRedux.dispatch({ type : SAVE_DOCUMENTS, payload : data })
    this.verificationBool = true;

  }

  generateFileArray = (name) => {
    const pathArr = [];

    this.addDocuments.subscribe(res => res[name].map(el => pathArr.push(el.path)));

    return pathArr;
  }

  // ADD QIWI NUMBER TO STORE UPDATER

  onVerifyNumberSub = () => this.factoryOfSubmitCard(this.formVerifyNumber.value.verifyNumb, AddedNumberQiwi, () => {
    this.sNewQiwi = this.documentsConfirmed
      .subscribe(res => {
        this.numberVerified = true;
        this.newCardQiwi = this.generateCorrectNumber(res.newNumberQiwi);
      });
  });

  // Only when we create a new card

  onSendQiwiCard = () => {
    const phone = this.formVerifyNumber.controls['verifyNumb'].value;
    this.apiService.post('/cards/qiwi', {

      phone_number  : this.generateCorrectNumber(phone),
      partner_id    : this.partnerId,
      documents     : {
        cover : this.generateFileArray('cover'),
        photo : this.generateFileArray('photo')
      }

    }).subscribe(
      (res) => {
        this.ngRedux.dispatch(new SaveClientCard(res.data.id).createAction());
        this.toOrderPay(3);
      },
      (err) => this.isAlreadyExError = this.asyncErrorService.errorHandler(err, 26)
    )
  }


  // Don't forget about subscription
  ngOnDestroy(){
    this.s1.unsubscribe();
    this.s2.unsubscribe();
  }

};
