import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableWeighComponent } from './table-weigh.component';

describe('TableWeighComponent', () => {
  let component: TableWeighComponent;
  let fixture: ComponentFixture<TableWeighComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableWeighComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableWeighComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
