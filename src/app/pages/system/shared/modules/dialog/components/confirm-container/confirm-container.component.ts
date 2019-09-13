import { Component, OnInit } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-confirm-container',
  templateUrl: './confirm-container.component.html',
  styleUrls: ['./confirm-container.component.scss']
})
export class ConfirmContainerComponent implements OnInit {

  constructor(private dialogRef : MatDialogRef<any>) {}

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
