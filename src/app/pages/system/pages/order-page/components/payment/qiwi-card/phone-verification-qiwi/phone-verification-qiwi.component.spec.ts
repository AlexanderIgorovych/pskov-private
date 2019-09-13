import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneVerificationQiwiComponent } from './phone-verification-qiwi.component';

describe('PhoneVerificationQiwiComponent', () => {
  let component: PhoneVerificationQiwiComponent;
  let fixture: ComponentFixture<PhoneVerificationQiwiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneVerificationQiwiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneVerificationQiwiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
