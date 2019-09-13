import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkipDocumentsComponent } from './skip-documents.component';

describe('SkipDocumentsComponent', () => {
  let component: SkipDocumentsComponent;
  let fixture: ComponentFixture<SkipDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkipDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkipDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
