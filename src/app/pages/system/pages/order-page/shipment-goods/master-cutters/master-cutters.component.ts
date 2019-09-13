import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../../core/http/api.service';
import { PartnerService } from '../../../../shared/services/partner/partner.service';
import { NgRedux } from '@angular-redux/store';
import { IPartnerState } from '../../../../../../core/store/partner/partner.store';
import { GetLoadedCutters, GetPickedCutter } from '../../../../../../core/store/partner/partner.actions';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-master-cutters',
  templateUrl: './master-cutters.component.html',
  styleUrls: ['./master-cutters.component.scss']
})
export class MasterCuttersComponent implements OnInit {

  cuttersList;

  cutterForm : FormGroup;

  @Output() nextWeigh = new EventEmitter()

  constructor(
    private apiService : ApiService,
    private partnerService : PartnerService,
    private ngRedux : NgRedux<IPartnerState>) {

      this.cutterForm = new FormGroup({
        cutter : new FormControl(null, [Validators.required])
      });
  };

  // Load List Of Cutters when component inits

  ngOnInit() {
    this.partnerService.getCutters()
      .subscribe(res => {
        this.cuttersList = res;
        this.ngRedux.dispatch(new GetLoadedCutters(res).createAction())
      });
  }

  // send choosed partner to store and redirect to weigh component

  pickCutter = () => {
    const idPicked     = this.cutterForm.controls.cutter.value
    const findNameById = this.cuttersList.filter(el => el.id === idPicked)

    const payloadData  = { ...findNameById[0] }

    this.ngRedux.dispatch(new GetPickedCutter(payloadData).createAction());

    this.nextWeigh.emit(1);
  }


}
