import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AddPhotoModalComponent } from '../add-photo-modal/add-photo-modal.component';
import { IFile } from '../../../core/services/add-car.service';
import { PhotoViewComponent } from '../photo-view/photo-view.component';

@Component({
  selector: 'app-add-photo',
  templateUrl: './add-photo.component.html',
  styleUrls: ['./add-photo.component.scss']
})
export class AddPhotoComponent implements OnInit {
  constructor(public dialog: MatDialog) {}
  @Input() title = 'Добавьте документы';
  @Input() nameType;
  @Input() files: IFile[];
  @Input() textContent = '';
  @Output() photoPicked = new EventEmitter();
  @Output() photoDeleted = new EventEmitter<number>();


  modal: MatDialogRef<AddPhotoModalComponent>;
  photoModal: MatDialogRef<PhotoViewComponent>;

  ngOnInit() {}

  openDialog() {
    this.modal = this.dialog.open(AddPhotoModalComponent);
    this.modal.componentInstance.sourcePicked.subscribe(res => {

      this.photoPicked.emit({ result : res, key : this.nameType });
      this.modal.close();
    });
    this.modal.componentInstance.canceled.subscribe(_ => {
      this.modal.close();
    });
  }

  onDocumentDelete(index: number) {
    this.photoDeleted.emit(index);
  }

  invokeDocumentView(src: string) {
    this.photoModal = this.dialog.open(PhotoViewComponent);
    this.photoModal.componentInstance.photoSrc = src;
    this.photoModal.componentInstance.closed.subscribe(_ => {
      this.closeDocumentView();
    });
  }

  closeDocumentView() {
    this.photoModal.close();
    this.photoModal = undefined;
  }
}
