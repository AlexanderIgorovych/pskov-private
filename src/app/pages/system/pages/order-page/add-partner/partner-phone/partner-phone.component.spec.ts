import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerPhoneComponent } from './partner-phone.component';

describe('PartnerPhoneComponent', () => {
  let component: PartnerPhoneComponent;
  let fixture: ComponentFixture<PartnerPhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerPhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
