import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QiwiCardComponent } from './qiwi-card.component';

describe('QiwiCardComponent', () => {
  let component: QiwiCardComponent;
  let fixture: ComponentFixture<QiwiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QiwiCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QiwiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
