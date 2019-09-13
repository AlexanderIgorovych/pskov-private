import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material';
// import { ModalMenuComponent } from './components/modal-menu/modal-menu.component';
import { ModalLogoutComponent } from './components/modal-logout/modal-logout.component';
import { ModalPartnerComponent } from './components/modal-partner/modal-partner.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { ModalFileComponent } from './components/modal-file/modal-file.component';
import { ModalCarComponent } from './components/modal-car/modal-car.component';
import { ConfirmEditComponent } from './components/modal-partner/confirm-edit/confirm-edit.component';
import { ConfirmEditModalComponent } from './components/modal-partner/confirm-edit-modal/confirm-edit-modal.component';
import { ModalCallComponent } from './components/modal-call/modal-call.component';
import { ConfirmContainerComponent } from './components/confirm-container/confirm-container.component';

@NgModule({
  imports: [CommonModule, SharedModule],
  declarations: [
    // ModalMenuComponent,
    ModalLogoutComponent,
    ModalPartnerComponent,
    ModalFileComponent,
    ModalCarComponent,
    ConfirmEditComponent,
    ConfirmEditModalComponent,
    ModalCallComponent,
    ConfirmContainerComponent
  ],
  entryComponents: [
    // ModalMenuComponent,
    ModalLogoutComponent,
    ModalPartnerComponent,
    ModalCarComponent,
    ConfirmEditModalComponent,
    ModalCallComponent,
    ConfirmContainerComponent
  ],
  providers: [
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: true } }
  ]
})
export class DialogModule {}
