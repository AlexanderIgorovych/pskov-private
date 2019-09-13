import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-modal-logout',
  templateUrl: './modal-logout.component.html',
  styleUrls: ['./modal-logout.component.scss']
})
export class ModalLogoutComponent {

  constructor(
    public dialogRef: MatDialogRef<ModalLogoutComponent>) { }

  onClose(result) {
    this.dialogRef.close(result);
  }
}
