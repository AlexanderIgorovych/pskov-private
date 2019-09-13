import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddPartnerRoutingModule } from './add-partner-routing.module';
import { AddPartnerComponent } from './add-partner.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { PartnerInfoComponent } from './partner-info/partner-info.component';
import { PartnerPhoneComponent } from './partner-phone/partner-phone.component';

@NgModule({
  imports: [CommonModule, AddPartnerRoutingModule, SharedModule],
  declarations: [
    AddPartnerComponent,
    PartnerInfoComponent,
    PartnerPhoneComponent
  ],
  providers: []
})
export class AddPartnerModule {}
