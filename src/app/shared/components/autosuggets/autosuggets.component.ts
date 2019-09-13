import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

export interface AutoSuggestOption {
  id: number;
  title: string;
}
@Component({
  selector: 'app-autosuggets',
  templateUrl: './autosuggets.component.html',
  styleUrls: ['./autosuggets.component.scss']
})
export class AutosuggetsComponent implements OnInit {
  constructor() {}
  formControlData = new FormControl();
  isListVisible = false;
  isInputFocused = false;
  suggestionList = [];
  @Input() placeholder = '';
  @Input() get inputFormControl() {
    return this.formControlData;
  }
  set inputFormControl(control: FormControl) {
    this.formControlData = control;
  }
  @Input() predefinedPicked: AutoSuggestOption;
  @Input() get data(): AutoSuggestOption[] {
    return this.suggestionList;
  }
  set data(data: AutoSuggestOption[]) {
    this.suggestionList = data || [];
    const isVisibleList = !!(data && data.length);
    this.setAutoSuggestVisibility(isVisibleList);
  }

  @Output() picked = new EventEmitter<AutoSuggestOption>();
  @Output() changes = new EventEmitter<string>();

  setInputFocus(state: boolean) {
    this.isInputFocused = state;
  }

  clearInput() {
    this.formControlData.reset();
    this.emitChanges();
  }
  setAutoSuggestVisibility(state: boolean) {
    this.isListVisible = state;
  }
  emitChanges() {
    const value = this.formControlData.value || '';
    this.changes.emit(value);
  }
  pickedSuggestion(data: AutoSuggestOption) {
    this.formControlData.setValue(data.title);
    this.picked.emit(data);
  }

  ngOnInit() {}
}
