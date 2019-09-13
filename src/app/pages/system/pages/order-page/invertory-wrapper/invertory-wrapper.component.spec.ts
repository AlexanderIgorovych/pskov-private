import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvertoryWrapperComponent } from './invertory-wrapper.component';

describe('InvertoryWrapperComponent', () => {
  let component: InvertoryWrapperComponent;
  let fixture: ComponentFixture<InvertoryWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvertoryWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvertoryWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
