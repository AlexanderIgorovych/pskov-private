import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaperworkWrapperComponent } from './paperwork-wrapper.component';

describe('PaperworkWrapperComponent', () => {
  let component: PaperworkWrapperComponent;
  let fixture: ComponentFixture<PaperworkWrapperComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaperworkWrapperComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaperworkWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
