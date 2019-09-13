import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmEditModalComponent } from './confirm-edit-modal.component';

describe('ConfirmEditModalComponent', () => {
  let component: ConfirmEditModalComponent;
  let fixture: ComponentFixture<ConfirmEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
