import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-skip-documents',
  templateUrl: './skip-documents.component.html',
  styleUrls: ['./skip-documents.component.scss']
})
export class SkipDocumentsComponent implements OnInit {
  constructor() {}

  @Output('cancel') cancel = new EventEmitter();
  @Output('skip') skip = new EventEmitter();

  onCancel() {
    this.cancel.emit();
  }

  onSkip() {
    this.skip.emit();
  }

  ngOnInit() {}
}
