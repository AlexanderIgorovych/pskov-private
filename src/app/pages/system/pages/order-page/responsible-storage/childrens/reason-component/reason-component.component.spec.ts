import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonComponentComponent } from './reason-component.component';

describe('ReasonComponentComponent', () => {
  let component: ReasonComponentComponent;
  let fixture: ComponentFixture<ReasonComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
