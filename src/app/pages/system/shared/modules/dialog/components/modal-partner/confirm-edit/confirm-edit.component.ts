import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmEditModalComponent } from '../confirm-edit-modal/confirm-edit-modal.component';
import { first } from 'rxjs/operators';
import { IAppState } from '../../../../../../../../core/store/rootStore';
import { select } from '@angular-redux/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-confirm-edit',
  templateUrl: './confirm-edit.component.html',
  styleUrls: ['./confirm-edit.component.scss']
})
export class ConfirmEditComponent implements OnInit, OnDestroy {
  constructor(public dialog: MatDialog) {}

  @Input() numberForm: FormGroup;
  @Input() partnerType: 0 | 1;
  @Input() partner;
  @Input() timeAfterTimerDie;
  @Input() codeConfirm;
  @Input() isAttemptFailed;
  @Input() isPartnerExist;

  isExist : boolean = false;

  @Output() restoreVerified       = new EventEmitter();
  @Output() destroyed             = new EventEmitter();
  @Output() sendCodeToClientPhone = new EventEmitter();

  s4 : Subscription;

  confirmDialog: MatDialogRef<ConfirmEditModalComponent>;

  @select((s: IAppState) => s.partner.phoneAlreadyExist) isPhoneExist;

  get userNumber() {
    return this.numberForm.controls['phone'];
  }

  get phoneCodeField() {
    return this.numberForm.controls['code'];
  }

  restoreVerifiedState() {
    this.restoreVerified.emit();
  }

  onSendCodeToClientPhone() {
    this.sendCodeToClientPhone.emit();
  }

  ngOnInit() {
    this.s4 = this.isPhoneExist.subscribe(
      (val) => {
        if (val !== undefined) {
          this.isExist = val;
        }
      }
    )

    this.changeHandleErr();
  }

  changeHandleErr(){
    this.numberForm.valueChanges.subscribe((_ => {
      this.isExist = false;
    }))
  }

  openConfirmEdit() {

    this.confirmDialog = this.dialog.open(ConfirmEditModalComponent);
    this.confirmDialog.componentInstance.closed.pipe(first()).subscribe(res => {
      this.closeDialog();
    });

    this.confirmDialog.componentInstance.confirmed
      .pipe(first())
      .subscribe(res => {
        this.closeDialog();
        this.destroyed.emit();
      });
  }

  closeDialog() {
    this.confirmDialog.close();
  }

  ngOnDestroy() {
    this.destroyed.emit();
  }
}
