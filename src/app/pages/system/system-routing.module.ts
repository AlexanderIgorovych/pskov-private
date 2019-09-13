import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SystemComponent } from './system/system.component';
import { AuthGuard } from '../../core/auth/auth.guard';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { NotificationPageComponent } from './pages/notification-page/notification-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { ShipmentCustomerComponent } from './pages/order-page/shipment-customer/shipment-customer.component';
import { ShipmentGoodsWrapperComponent } from './pages/order-page/shipment-goods-wrapper/shipment-goods-wrapper.component';
import { ShipmentCustomerWrapperComponent } from './pages/order-page/shipment-customer-wrapper/shipment-customer-wrapper.component';
import { PaperworkWrapperComponent } from './pages/order-page/paperwork-wrapper/paperwork-wrapper.component';
import { ResponsibleStorageWrapperComponent } from './pages/order-page/responsible-storage-wrapper/responsible-storage-wrapper.component';
import { InvertoryWrapperComponent } from './pages/order-page/invertory-wrapper/invertory-wrapper.component';

const routes: Routes = [
  {
    path: '',
    component: SystemComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: '', component: MainPageComponent },
      { path: 'create', component: CreatePageComponent },
      { path: 'notifications', component: NotificationPageComponent },
      { path: 'order', component: OrderPageComponent, },
      { path: 'responsible-storage/:type', component : ResponsibleStorageWrapperComponent },
      { path: 'shipment-customer/:type',    component : ShipmentCustomerWrapperComponent },
      { path: 'order-psa/:type', component : PaperworkWrapperComponent},
      { path: 'shipment-goods/:type', component : ShipmentGoodsWrapperComponent  },
      { path: 'invertory', component : InvertoryWrapperComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
