import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleStorageWrapperComponent } from './responsible-storage-wrapper.component';

describe('ResponsibleStorageWrapperComponent', () => {
  let component: ResponsibleStorageWrapperComponent;
  let fixture: ComponentFixture<ResponsibleStorageWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsibleStorageWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibleStorageWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
