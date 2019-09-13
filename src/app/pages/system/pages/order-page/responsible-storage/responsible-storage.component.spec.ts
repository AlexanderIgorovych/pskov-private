import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleStorageComponent } from './responsible-storage.component';

describe('ResponsibleStorageComponent', () => {
  let component: ResponsibleStorageComponent;
  let fixture: ComponentFixture<ResponsibleStorageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsibleStorageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibleStorageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
