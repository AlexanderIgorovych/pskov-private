import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutosuggetsComponent } from './autosuggets.component';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MaterialModule } from '../../modules/material.module';

describe('AutosuggetsComponent', () => {
  let component: AutosuggetsComponent;
  let fixture: ComponentFixture<AutosuggetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AutosuggetsComponent],
      imports: [FormsModule, ReactiveFormsModule, MaterialModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutosuggetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an Autosuggest component', () => {
    expect(component).toBeTruthy();
  });
  it('should set initial property of input focus to false', () => {
    expect(component.isInputFocused).toBeFalsy();
  });
  it('should set isInput property to true, when called with true argument', () => {
    component.setInputFocus(true);
    expect(component.isInputFocused).toEqual(true);
  });
  it('should set isInput property to false, when called with false argument', () => {
    component.setInputFocus(false);
    expect(component.isInputFocused).toEqual(false);
  });
  it('should have default formControl input value', () => {
    expect(component.formControlData).toBeTruthy();
  });
  it('should have default input inputFormControl as instance of formControl', () => {
    expect(component.inputFormControl instanceof FormControl).toBeTruthy();
  });
  it('should set formControlData value of component, when inputFormControl input is passed', () => {
    const value = new FormControl('value');
    component.inputFormControl = value;
    expect(component.formControlData).toEqual(value);
  });
  it('should set dataList correctly', () => {
    const value = [{ title: 'hello', id: 1 }];
    component.data = value;
    expect(component.data).toEqual(value);
  });
  it('should make isListVisible value of component true if we set  input data array with some length', () => {
    const value = [{ title: 'hello', id: 1 }];
    component.data = value;
    expect(component.isListVisible).toBeTruthy();
  });
  it('should make isListVisible false if we set  input data empty', () => {
    const value = undefined;
    component.data = value;
    expect(component.isListVisible).toBeFalsy();
  });
  it('should set component input value in formControl', () => {
    const value = 'hello';
    component.formControlData.setValue(value);
    expect(component.formControlData.value).toEqual(value);
  });
  it('should clear filled input field when clearInput method is called', () => {
    const value = 'hello';
    component.formControlData.setValue(value);
    component.clearInput();
    expect(component.formControlData.value).toBeNull();
  });
  it('should emit event when input is cleared', () => {
    const value = 'hello';
    component.formControlData.setValue(value);
    spyOn(component.changes, 'emit');
    component.clearInput();
    expect(component.changes.emit).toHaveBeenCalled();
  });
  it('should set formControl value as picked at autosuggest item title', () => {
    const value = { title: 'hello', id: 1 };
    component.pickedSuggestion(value);
    expect(component.formControlData.value).toEqual(value.title);
  });
  it('should notify event with value, when autosuggest option was selected', () => {
    const value = { title: 'hello', id: 1 };
    spyOn(component.picked, 'emit');
    component.pickedSuggestion(value);
    expect(component.picked.emit).toHaveBeenCalledWith(value);
  });
});
