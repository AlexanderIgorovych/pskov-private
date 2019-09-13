import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PhotoSection } from '../../../pages/system/pages/order-page/components/payment/client-card/client-card.component';
export const photosTabs = () => [
  { title: 'ПРИКРЕПИТЕ ФОТО ДОКУМЕНТА С РЕКВИЗИТАМИ', data: [], key : 'requisites' },
  { title: 'ПРИКРЕПИТЕ ФОТО ЛИЦЕВОЙ СТОРОНЫ КАРТЫ', data: [],   key: 'photo' }
];
@Component({
  selector: 'app-add-card-photo',
  templateUrl: './add-card-photo.component.html',
  styleUrls: ['./add-card-photo.component.scss']
})
export class AddCardPhotoComponent implements OnInit {
  constructor() {}

  @Output() addedPhoto = new EventEmitter();
  @Output() deletedPhoto = new EventEmitter();
  @Output() requestedOperator = new EventEmitter();
  @Output() handleBack = new EventEmitter();

  @Input() arePhotosFilled = false;
  @Input() isExistError;

  @Input() isClientReady;

  @Input() photos: PhotoSection[] = photosTabs();

  onHandleBack = () => this.handleBack.emit();

  addPhoto(index, data) {
    this.addedPhoto.emit({ index, data });
  }

  deletePhoto(index, data) {
    this.deletedPhoto.emit({ index, data });
  }

  sendRequest() {
    this.requestedOperator.emit();
  }

  ngOnInit() {}
}
