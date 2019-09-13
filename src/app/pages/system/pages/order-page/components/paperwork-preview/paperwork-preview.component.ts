import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-paperwork-preview',
  templateUrl: './paperwork-preview.component.html',
  styleUrls: ['./paperwork-preview.component.scss']
})
export class PaperworkPreviewComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  @Output() eventPageTabChange = new EventEmitter();

  constructor(private _formBuilder: FormBuilder) {}

  @ViewChild('stepper', { read: MatStepper }) stepper;

  changePageTab = (e) => this.eventPageTabChange.emit(e);

  nextStep() {
    this.stepper.next();
  }

  previousStep() {
    this.stepper.previous();
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
}
