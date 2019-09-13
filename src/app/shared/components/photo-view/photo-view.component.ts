import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-photo-view',
  templateUrl: './photo-view.component.html',
  styleUrls: ['./photo-view.component.scss']
})
export class PhotoViewComponent implements OnInit {
  constructor() {}
  @Input() photoSrc: string;
  @Output() closed = new EventEmitter();

  ngOnInit() {}

  close() {
    this.closed.emit();
  }
}
