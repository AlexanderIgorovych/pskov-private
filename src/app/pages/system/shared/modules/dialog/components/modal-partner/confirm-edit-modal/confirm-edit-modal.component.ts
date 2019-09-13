import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirm-edit-modal',
  templateUrl: './confirm-edit-modal.component.html',
  styleUrls: ['./confirm-edit-modal.component.scss']
})
export class ConfirmEditModalComponent implements OnInit {
  constructor() {}

  @Output() closed    = new EventEmitter();
  @Output() confirmed = new EventEmitter();

  close() {
    this.closed.emit();
  }

  confirm() {
    this.confirmed.emit();
  }

  ngOnInit() {}
}
