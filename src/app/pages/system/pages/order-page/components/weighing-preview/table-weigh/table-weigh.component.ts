import { Component, OnInit, Input } from '@angular/core';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { IAppState } from '../../../../../../../core/store/rootStore';
import { select } from '@angular-redux/store';
import { pluck, first, filter } from 'rxjs/operators';

@Component({
  selector: 'app-table-weigh',
  templateUrl: './table-weigh.component.html',
  styleUrls: ['./table-weigh.component.scss']
})
export class TableWeighComponent implements OnInit {

  // trailer
  isTrailerPicked;
  @select((s : IAppState) => s.car.autoSuggestedTrailerPicked) trailer;

  // Recieve table from parent component

  @Input() tableData;
  @Input() tableType;
  @Input() isChangeAllow : boolean = false;
  @Input() defaultTable;
  @Input() isMobile : boolean = false;
  @Input() isContainer;
  @Input() isSelectedContainer;

  // Output action or data
  @Output() editTableById = new EventEmitter();
  @Output() tableRowNew   = new EventEmitter();
  @Output() tableSubmit   = new EventEmitter();
  @Output() handleMobile  = new EventEmitter();
  @Output() containerCreate = new EventEmitter();
  @Output() markAsIssue = new EventEmitter();

  constructor() { }

  // Event Emitter Handler
  onEditTable   = (id, tare, tableName) => this.editTableById.emit({ id, tare, tableName });

  onNewTableRow = () => this.tableRowNew.emit();
  onTableSubmit = () => this.tableSubmit.emit();

  handleRedirectMobile = () => this.handleMobile.emit();

  onCreateContainer = () => this.containerCreate.emit();
  handleIssue       = (id, tableName) => this.markAsIssue.emit({ id, tableName });

  ngOnInit() {
    this.trailer.pipe(
      filter(res => res !== undefined),
    ).subscribe(trailer => {
      trailer ? this.isTrailerPicked = true : this.isTrailerPicked = false
    })
  };

}
