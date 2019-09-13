import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {
  @Input() elements: any;
  @Input() empty_state: any;
  @Input() currPage;
  @Input() total;
  @Input() loader;
  @Input() currentTab;

  @Output() changeHandlePage = new EventEmitter();

  constructor() { }



  handlePage = e => this.changeHandlePage.emit(e);


  ngOnInit() {
  }

}
