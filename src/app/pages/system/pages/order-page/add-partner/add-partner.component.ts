import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-partner',
  templateUrl: './add-partner.component.html',
  styleUrls: ['./add-partner.component.scss']
})
export class AddPartnerComponent implements OnInit {
  partnerType: number;
  form1: FormGroup;
  constructor() {}
  ngOnInit() {
    this.form1 = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      identifier: new FormControl(null, [Validators.required])
    });
  }
  onNoClick(): void {}
  onPartnerTypeSelect(type: number): void {
    this.partnerType = this.partnerType === type ? null : type;
  }
}
