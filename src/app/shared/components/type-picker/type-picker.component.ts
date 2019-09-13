import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-type-picker',
  templateUrl: './type-picker.component.html',
  styleUrls: ['./type-picker.component.scss']
})
export class TypePickerComponent implements OnInit {
  constructor() {}

  @Input() declineData : number; 
  @Input() title = 'ВЫБЕРИТЕ ТИП';
  @Input() tabs: string[] = [];
  @Output() pick = new EventEmitter<number>();
  pickedType: number;

  pickType(index: number) {
    this.pickedType === index
      ? (this.pickedType = undefined)
      : (this.pickedType = index);
    this.pick.emit(this.pickedType);
  }

  ngOnInit() {}
}
