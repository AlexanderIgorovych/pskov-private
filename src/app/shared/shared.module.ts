import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DirtyDirective } from './directives/dirty.directive';
import { MaterialModule } from './modules/material.module';
import { FormFieldComponent } from './components/form-field/form-field.component';
import { InputMainComponent } from './components/input-main/input-main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputRefDirective } from './directives/input-ref.directive';
import { MomentPipe } from '../pages/system/shared/pipes/moment.pipe';
import { AutosuggetsComponent } from './components/autosuggets/autosuggets.component';
import { OfflineTabComponent } from './components/offline-tab/offline-tab.component';
import { AddPhotoComponent } from './components/add-photo/add-photo.component';
import { AddPhotoModalComponent } from './components/add-photo-modal/add-photo-modal.component';
import { CameraComponent } from './components/camera/camera.component';
import { SkipDocumentsComponent } from './components/skip-documents/skip-documents.component';
import { PhotoViewComponent } from './components/photo-view/photo-view.component';
import { TypePickerComponent } from './components/type-picker/type-picker.component';
import { FormCardComponent } from './components/form-card/form-card.component';
import { SectionCardComponent } from './components/section-card/section-card.component';
import { AddCardPhotoComponent } from './components/add-card-photo/add-card-photo.component';
import { InputAutoSectionComponent } from './components/input-auto-section/input-auto-section.component';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MaterialModule],
  declarations: [
    DirtyDirective,
    FormFieldComponent,
    InputMainComponent,
    InputRefDirective,
    MomentPipe,
    AutosuggetsComponent,
    OfflineTabComponent,
    AddPhotoComponent,
    AddPhotoModalComponent,
    CameraComponent,
    SkipDocumentsComponent,
    PhotoViewComponent,
    TypePickerComponent,
    FormCardComponent,
    SectionCardComponent,
    AddCardPhotoComponent,
    InputAutoSectionComponent
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    DirtyDirective,
    MaterialModule,
    FormFieldComponent,
    InputMainComponent,
    InputRefDirective,
    AutosuggetsComponent,
    OfflineTabComponent,
    AddPhotoComponent,
    AddPhotoModalComponent,
    CameraComponent,
    SkipDocumentsComponent,
    PhotoViewComponent,
    TypePickerComponent,
    FormCardComponent,
    SectionCardComponent,
    AddCardPhotoComponent
  ],
  entryComponents: [
    AddPhotoModalComponent,
    CameraComponent,
    SkipDocumentsComponent,
    PhotoViewComponent,
    AddCardPhotoComponent
  ]
})
export class SharedModule {}
