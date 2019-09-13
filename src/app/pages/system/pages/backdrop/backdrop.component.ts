import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-backdrop',
  templateUrl: './backdrop.component.html',
  styleUrls: ['./backdrop.component.scss']
})
export class BackdropComponent implements OnInit {

  constructor() { }

  @Input() backdropActive : boolean = false;

  @Output() handleBackDrop = new EventEmitter();

  handleClickBack = () => {
    this.handleBackDrop.emit(!this.backdropActive);
  }

  ngOnInit() {
  }

}
