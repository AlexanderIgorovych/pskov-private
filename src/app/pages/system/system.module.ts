import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemComponent } from './system/system.component';
import { SystemRoutingModule } from './system-routing.module';
import { HeaderComponent } from './shared/components/header/header.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { SharedModule } from '../../shared/shared.module';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CreatePageComponent } from './pages/create-page/create-page.component';
import { NotificationPageComponent } from './pages/notification-page/notification-page.component';
import { DialogModule } from './shared/modules/dialog/dialog.module';
import { TabComponent } from './shared/components/tab/tab.component';
import { PreviewComponent } from './pages/main-page/components/preview/preview.component';
import { PreviewItemComponent } from './pages/main-page/components/preview-item/preview-item.component';
import { NotifPreviewComponent } from './pages/notification-page/components/notif-preview/notif-preview.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { PaperworkPreviewComponent } from './pages/order-page/components/paperwork-preview/paperwork-preview.component';
import { WeighingPreviewComponent } from './pages/order-page/components/weighing-preview/weighing-preview.component';
import { PartnerComponent } from './pages/order-page/components/partner/partner.component';
import { InputCheckComponent } from './shared/components/input-check/input-check.component';
import { CarComponent } from './pages/order-page/components/car/car.component';
import { DocumentsComponent } from './pages/order-page/components/documents/documents.component';
import { PaymentComponent } from './pages/order-page/components/payment/payment.component';
import { CashComponent } from './pages/order-page/components/payment/cash/cash.component';
import { ClientCardComponent } from './pages/order-page/components/payment/client-card/client-card.component';
import { AddCardComponent } from './pages/order-page/components/payment/client-card/add-card/add-card.component';
import { QiwiCardComponent } from './pages/order-page/components/payment/qiwi-card/qiwi-card.component';
import { PsaComponent } from './pages/order-page/components/psa/psa.component';
import { SideMenuComponent } from './pages/side-menu/side-menu.component';
import { BackdropComponent } from './pages/backdrop/backdrop.component';
import { PhoneVerificationQiwiComponent } from './pages/order-page/components/payment/qiwi-card/phone-verification-qiwi/phone-verification-qiwi.component';
import { NewWeightComponent } from './pages/order-page/components/weighing-preview/new-weight/new-weight.component';
import { TableWeighComponent } from './pages/order-page/components/weighing-preview/table-weigh/table-weigh.component';
import { FinalTableComponent } from './pages/order-page/components/weighing-preview/final-table/final-table.component';
import { ShipmentGoodsComponent } from './pages/order-page/shipment-goods/shipment-goods.component';
import { MasterCuttersComponent } from './pages/order-page/shipment-goods/master-cutters/master-cutters.component';
import { ShipmentCustomerComponent } from './pages/order-page/shipment-customer/shipment-customer.component';
import { CustomerDocumentsComponent } from './pages/order-page/shipment-customer/customer-documents/customer-documents.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ResponsibleStorageListComponent } from './pages/main-page/responsible-storage-list/responsible-storage-list.component';
import { ResponsibleStorageComponent } from './pages/order-page/responsible-storage/responsible-storage.component';
import { ReasonComponentComponent } from './pages/order-page/responsible-storage/childrens/reason-component/reason-component.component';
import { PhoneComponent } from './pages/order-page/responsible-storage/childrens/phone/phone.component';
import { ModalMenuComponent } from './shared/modules/dialog/components/modal-menu/modal-menu.component';
import { ShipmentCustomerWrapperComponent } from './pages/order-page/shipment-customer-wrapper/shipment-customer-wrapper.component';
import { ResponsibleStorageWrapperComponent } from './pages/order-page/responsible-storage-wrapper/responsible-storage-wrapper.component';
import { ShipmentGoodsWrapperComponent } from './pages/order-page/shipment-goods-wrapper/shipment-goods-wrapper.component';
import { InvertoryWrapperComponent } from './pages/order-page/invertory-wrapper/invertory-wrapper.component';
import { PaperworkWrapperComponent } from './pages/order-page/paperwork-wrapper/paperwork-wrapper.component';


@NgModule({
  imports: [CommonModule, SystemRoutingModule, SharedModule, DialogModule, NgxPaginationModule,],
  declarations: [
    ModalMenuComponent,
    SystemComponent,
    HeaderComponent,
    MenuComponent,
    MainPageComponent,
    CreatePageComponent,
    NotificationPageComponent,
    TabComponent,
    PreviewComponent,
    PreviewItemComponent,
    NotifPreviewComponent,
    OrderPageComponent,
    PaperworkPreviewComponent,
    WeighingPreviewComponent,
    PartnerComponent,
    InputCheckComponent,
    CarComponent,
    DocumentsComponent,
    PaymentComponent,
    CashComponent,
    ClientCardComponent,
    AddCardComponent,
    QiwiCardComponent,
    PsaComponent,
    SideMenuComponent,
    BackdropComponent,
    PhoneVerificationQiwiComponent,
    NewWeightComponent,
    TableWeighComponent,
    FinalTableComponent,
    ShipmentGoodsComponent,
    MasterCuttersComponent,
    ShipmentCustomerComponent,
    CustomerDocumentsComponent,
    ResponsibleStorageListComponent,
    ResponsibleStorageComponent,
    ReasonComponentComponent,
    PhoneComponent,
    ShipmentCustomerWrapperComponent,
    ResponsibleStorageWrapperComponent,
    ShipmentGoodsWrapperComponent,
    InvertoryWrapperComponent,
    PaperworkWrapperComponent,
  ],
  entryComponents: [AddCardComponent, ModalMenuComponent]
})
export class SystemModule {}
