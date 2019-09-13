import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { ApiService } from '../../../../../../../../core/http/api.service';
import { Observable, Subscription } from 'rxjs';

import { NgRedux, select } from '@angular-redux/store';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PHONE_REGEX } from '../../../../../../../../core/services/partner.service';
import { ConfirmEditModalComponent } from '../../../../../../shared/modules/dialog/components/modal-partner/confirm-edit-modal/confirm-edit-modal.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { first, map } from 'rxjs/operators';


@Component({
  selector: 'app-phone-verification-qiwi',
  templateUrl: './phone-verification-qiwi.component.html',
  styleUrls: ['./phone-verification-qiwi.component.scss']
})
export class PhoneVerificationQiwiComponent implements OnInit {

  formNumberVerify : FormGroup;

  partnerId;
  interval;

  subsPartner : Subscription;
  errorCode   : string = null;
  timerValue  : number;
  timeLeft    : any    = 59;
  minute      : number;
  resendCode  : boolean = false;
  withZero    : any
  nextStepBtn : boolean = false;
  btn1cVerify : boolean = true;
  attemptCounter : number = 0;
  attemptFailed  : boolean = false;

  numberVerificated : boolean = false;
  confirmEditModal  : MatDialogRef<ConfirmEditModalComponent>;

  @select('partner') choosedPartner;

  @Input()  cardValue;
  @Output() pageRedirect        = new EventEmitter();
  @Output() numberReset         = new EventEmitter();
  @Output() resetPhonePageData  = new EventEmitter();


  constructor(public dialog : MatDialog, private apiService : ApiService) {

    // Constructor for Verify Number Form
    this.formNumberVerify = new FormGroup({
      code : new FormControl(null, [Validators.required, Validators.maxLength(4), Validators.minLength(4)])
    })
  };

  // When page was mounted - code will'be send to user
  ngOnInit() {
    this.loadResource();

    this.onChanges();
  };

  onChanges = () => {
    this.formNumberVerify.valueChanges.pipe(
      map(() => this.errorCode = null)
    ).subscribe(value => {this.errorCode = null})

    this.formNumberVerify.valueChanges.subscribe(res => {
      if (res.code.length === 4) {
        this.sendVerificationCode();
      }
    })
  }

  // Actions with model. For example. Whhen user click on "confirm" - angular will redirect him to other page

  onOpenModal = () => {
    // Open modal
    this.confirmEditModal = this.dialog.open(ConfirmEditModalComponent);
    // Close Modal
    this.confirmEditModal.componentInstance.closed.pipe(first()).subscribe(res => {
      this.closeDialog();
    });
    // Confirm modal
    this.confirmEditModal.componentInstance.confirmed
      .subscribe(res => {
        this.resetPhonePageData.emit();
        this.handleRedirectPage(7)
        this.closeDialog();
      })
  };


  handleResetNumber = () => {
    this.numberReset.emit();
    this.handleRedirectPage(1);
  }


  closeDialog        =  ()  => this.confirmEditModal.close();
  handleRedirectPage = page => this.pageRedirect.emit(page);
  // Send activation code function

  sendCodeAct = (res?) => {
    this.errorCode = null;

    this.btn1cVerify = true;

    const dataLoaded = {
      partner_id   : res ? res : this.partnerId,
      phone_number : this.cardValue
    }
    // Send code to user
    this.apiService.post('/phone.verify', dataLoaded);
    this.startTimer(5);
  };

  loadResource = async () => {
    /*
      I wrote promise, because data load asynchrounosly,
      we need to send request only after all data loaded to
      page.
    */
    return new Promise(resolve => {
      this.subsPartner = this.choosedPartner
        .subscribe(res => {
          this.partnerId = res.pickedPartner.id
          resolve(this.partnerId)
        })
    })
    .then(res => {
      this.sendCodeAct(res);
    })

  };

  // When user click on confirm button. Recieved code send to server

  sendVerificationCode = () => {

    const data = {
      partner_id   : this.partnerId,
      phone_number : this.cardValue,
      code         : this.formNumberVerify.value.code
    }

    this.apiService.post('/phone.confirm', data)
      .subscribe(

        (res)   => {
          this.nextStepBtn       = true
          this.numberVerificated = true;
        },

        (error) => {

          this.attemptCounter = this.attemptCounter + 1;

          this.attemptCounter >= 2 ? this.attemptFailed = true : this.attemptFailed = false;

          const errorStorage = {
            ...error
          }
          if (errorStorage.response.data.error.code === 22) {
            this.errorCode = 'Неверный код. Повторите попытку по истечению времени'
          }
        }
      )
  }

  // Simple Timer. You can reuse it in the future with any duration what u want

  startTimer(duration) {

      this.minute = duration - 1;
      this.timeLeft = 59;

      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;

          if (this.timeLeft.toString().length === 1) {
            this.timeLeft = `0${this.timeLeft}`
          }
        } else {
          this.minute   = this.minute - 1;
          this.timeLeft = 59;
        }

        if (this.timeLeft === '00' && this.minute === 0) {
          this.nextStepBtn = false;
          this.resendCode  = true;
          this.btn1cVerify = false;
          this.pauseTimer();
        }
      }, 1000);
    };

    pauseTimer() {
      clearInterval(this.interval);
    }

}
