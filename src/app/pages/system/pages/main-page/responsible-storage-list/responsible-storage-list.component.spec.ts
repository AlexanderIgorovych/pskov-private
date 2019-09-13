import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleStorageListComponent } from './responsible-storage-list.component';

describe('ResponsibleStorageListComponent', () => {
  let component: ResponsibleStorageListComponent;
  let fixture: ComponentFixture<ResponsibleStorageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsibleStorageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibleStorageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
