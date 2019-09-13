import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { RawDocumentsData } from '../../../../../../../core/services/payment.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import {
  photosTabs,
  AddCardPhotoComponent
} from '../../../../../../../shared/components/add-card-photo/add-card-photo.component';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../../../../../../core/store/rootStore';
import { SaveClientCard } from '../../../../../../../core/store/payment/payment.actions';

export enum clientCardState {
  photo,
  pickCard
}
export interface PhotoSection {
  title: string;
  data: any[];
}
@Component({
  selector: 'app-client-card',
  templateUrl: './client-card.component.html',
  styleUrls: ['./client-card.component.scss']
})
export class ClientCardComponent implements OnInit {
  constructor(private fb: FormBuilder, private dialog: MatDialog, private ngRedux : NgRedux<IAppState>) {}
  @Input() state = clientCardState.photo;
  @Input() cards;
  @Input() isConfirmed;
  @Input() isCardExist;
  isReadyToNext = false;
  cardForm: FormGroup;
  addCardModal: MatDialogRef<AddCardPhotoComponent>;

  photos: PhotoSection[] = photosTabs();
  newCardPhotos: PhotoSection[] = photosTabs();

  @Output() sendData = new EventEmitter<RawDocumentsData>();
  @Output() pickedPartnerCard = new EventEmitter();
  @Output() newCardAdded = new EventEmitter();
  @Output() resetValue = new EventEmitter();

  @Output() isReadyNext = new EventEmitter();

  addPhoto(info, source = this.photos) {
    const { index: i, data: photo } = info;

    const file = {
      name: photo.result.source.name,
      url : photo.result.img,
      type: 2,
      source: photo.result.source,
      document_type : photo.key
    };


    source[i].data.push(file);
  }

  deletePhoto(data, source = this.photos) {
    const { index: sectionIndex, data: photoIndex } = data;
    source[sectionIndex].data.splice(photoIndex, 1);
  }

  areSourceFilled(source) {
    return source.filter(el => el.data.length).length === source.length;
  }

  get arePhotosFilled() {
    return this.areSourceFilled(this.photos);
  }

  get areNewCardPhotosFilled() {
    return this.areSourceFilled(this.newCardPhotos);
  }

  sendRequest() {
    const data: RawDocumentsData = {
      requisites: this.photos[0].data,
      cardFace: this.photos[1].data
    };

    this.sendData.emit(data);
  }

  sendCardRequest() {
    this.isReadyToNext = true;

    const card = this.cardForm.controls.card.value

    this.ngRedux.dispatch(new SaveClientCard(card).createAction())

    this.isReadyNext.emit(this.isReadyToNext);
  }

  pickPartnerCard(data) {
    this.pickedPartnerCard.emit(data.value);
  }

  handleState = value => this.state = value;

  onHandleChangePage = page => {
    this.resetValue.emit(false);
    this.handleState(page);
  }

  handleAddCardEvents() {
    this.addCardModal.componentInstance.addedPhoto.subscribe(res => {
      this.addPhoto(res, this.newCardPhotos);
      this.addCardModal.componentInstance.arePhotosFilled = this.areNewCardPhotosFilled;
    });
    this.addCardModal.componentInstance.deletedPhoto.subscribe(res => {
      this.deletePhoto(res, this.newCardPhotos);
      this.addCardModal.componentInstance.arePhotosFilled = this.areNewCardPhotosFilled;
    });
    this.addCardModal.componentInstance.requestedOperator.subscribe(_ => {
      this.addCardModal.close();
      this.addCardModal = undefined;
      this.newCardAdded.emit(this.newCardPhotos);
    });
  }
  invokeAddCard() {
    this.addCardModal = this.dialog.open(AddCardPhotoComponent);
    this.addCardModal.componentInstance.photos = this.newCardPhotos;
    this.addCardModal.componentInstance.arePhotosFilled = this.areNewCardPhotosFilled;
    this.handleAddCardEvents();
  }

  ngOnInit() {
    this.cardForm = this.fb.group({ card: ['', [Validators.required]] });
  }
}
