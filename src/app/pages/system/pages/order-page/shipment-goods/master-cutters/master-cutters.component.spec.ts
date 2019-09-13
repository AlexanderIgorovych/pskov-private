import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterCuttersComponent } from './master-cutters.component';

describe('MasterCuttersComponent', () => {
  let component: MasterCuttersComponent;
  let fixture: ComponentFixture<MasterCuttersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterCuttersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterCuttersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
