import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { CameraComponent } from '../camera/camera.component';
import { unsubscribeAll } from '../../../core/untils';
import {
  CameraPhoto,
  PhotoService
} from '../../../core/services/photo.service';

@Component({
  selector: 'app-add-photo-modal',
  templateUrl: './add-photo-modal.component.html',
  styleUrls: ['./add-photo-modal.component.scss']
})
export class AddPhotoModalComponent
  implements OnInit, AfterViewInit, OnDestroy {
  constructor(public dialog: MatDialog, protected photoService: PhotoService) {}

  cameraDialog: MatDialogRef<CameraComponent>;

  sourceToSave: CameraPhoto;
  subscriptions = [];
  targetTemplate;
  @ViewChild('pickTool') pickTool;
  @ViewChild('camera') camera;

  @Output() sourcePicked = new EventEmitter();
  @Output() canceled = new EventEmitter();

  takeGaleryPhoto(data) {
    this.photoService.generateCameraImageFromInput(data).then(res => {
      this.sourceToSave = res;
      this.sourcePicked.emit(this.sourceToSave);
    });
  }

  setTemplate(template) {
    this.targetTemplate = template;
  }

  capturePhoto(data: CameraPhoto) {
    this.sourceToSave = data;
    this.sourcePicked.emit(this.sourceToSave);
  }

  takeCameraPhoto() {
    this.setTemplate(this.camera);
  }

  cancel() {
    this.canceled.emit();
  }

  ngOnInit() {
    this.setTemplate(this.pickTool);
  }

  ngAfterViewInit() {}

  ngOnDestroy() {
    unsubscribeAll(this.subscriptions);
  }
}
