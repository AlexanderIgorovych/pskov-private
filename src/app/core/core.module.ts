import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgRedux, NgReduxModule } from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from './store/rootStore';
import { DataService } from './data.service';
import { ValidateService } from './validations/validate.conditions.service';
import { ConfigService } from './config.service';

import { AuthService } from './auth/auth.service';

import { AuthEpicsService } from './store/epics/auth.epics.service';
import { createEpicMiddleware } from 'redux-observable';
import { createStore, applyMiddleware } from 'redux';
import { ErrorEmitterService } from './error-emitter.service';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ErrorHandlerService } from './error-handler.service';
import { FormGeneratorService } from './validations/form-generator.service';
import { ValidationCoreService } from './validations/validate.service';
import { UserActions } from './store/user/user.actions';
import { PropertyActions } from './store/property/property.actions';
import { NavigationActions } from './store/navigation/navigation.actions';
import { OrderActions } from './store/order/order.actions';
import { PartnerEpicsService } from './store/epics/partner-epics.service';
import { CarService } from './services/car.service';
import { CarEpicsService } from './store/epics/car-epics.service';
import { AddCarEpicsService } from './store/epics/add-car-epics.service';
import { PhotoService } from './services/photo.service';
import { AddDocumentsEpicsService } from './store/epics/add-documents-epics.service';
import { OrderService } from './services/order.service';
import { PaymentService } from './services/payment.service';
import { PaymentEpicsService } from './store/epics/payment-epics.service';

@NgModule({
  imports: [CommonModule, NgReduxModule],
  providers: [
    ConfigService,
    DataService,
    AuthService,
    DatePipe,
    ValidateService,
    AuthEpicsService,
    ErrorEmitterService,
    ErrorHandlerService,
    FormGeneratorService,
    ValidationCoreService,
    CarService,
    UserActions,
    PropertyActions,
    NavigationActions,
    OrderActions,
    CarEpicsService,
    AddCarEpicsService,
    PhotoService,
    AddDocumentsEpicsService,
    OrderService,
    PaymentService,
    PaymentEpicsService
  ]
})
export class CoreModule {
  constructor(
    ngRedux: NgRedux<IAppState>,
    private authEpics: AuthEpicsService,
    private partnerEpics: PartnerEpicsService,
    private carEpics: CarEpicsService,
    private addCarEpics: AddCarEpicsService,
    private addDocumentsEpics: AddDocumentsEpicsService,
    private paymentEpics: PaymentEpicsService,
    private combine: ErrorEmitterService
  ) {
    const epicMiddleware: any = createEpicMiddleware();
    const store = createStore(
      rootReducer,
      INITIAL_STATE,
      composeWithDevTools(applyMiddleware(epicMiddleware))
    );

    const rootEpic = combine.combineEpicsAndCatchErrors(
      ...[
        this.authEpics.authEpics,
        this.partnerEpics.partnerEpics,
        this.carEpics.carEpics,
        this.addCarEpics.addCarEpics,
        this.addDocumentsEpics.addDocuments,
        this.paymentEpics.paymentEpics
      ]
    );
    epicMiddleware.run(rootEpic);
    ngRedux.provideStore(store);
  }
}
