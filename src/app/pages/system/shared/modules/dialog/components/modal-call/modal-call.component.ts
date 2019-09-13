import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-call',
  templateUrl: './modal-call.component.html',
  styleUrls: ['./modal-call.component.scss']
})
export class ModalCallComponent implements OnInit {
  constructor() {}
  @Output() canceled = new EventEmitter();
  @Output() requestedCall = new EventEmitter();

  cancel() {
    this.canceled.emit();
  }

  requestCall() {
    this.requestedCall.emit();
  }

  ngOnInit() {}
}
