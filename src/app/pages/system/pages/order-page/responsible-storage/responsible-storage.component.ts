import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-responsible-storage',
  templateUrl: './responsible-storage.component.html',
  styleUrls: ['./responsible-storage.component.scss']
})
export class ResponsibleStorageComponent implements OnInit {

  @ViewChild('stepper') stepper

  constructor() { }

  next = () => this.stepper.next();

  ngOnInit() {
  }

}
