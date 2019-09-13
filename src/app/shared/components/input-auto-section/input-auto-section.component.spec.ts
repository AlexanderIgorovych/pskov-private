import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAutoSectionComponent } from './input-auto-section.component';

describe('InputAutoSectionComponent', () => {
  let component: InputAutoSectionComponent;
  let fixture: ComponentFixture<InputAutoSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputAutoSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputAutoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
