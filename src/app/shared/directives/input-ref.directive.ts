import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appInputRef]',
  exportAs: 'appInputRef'
})
export class InputRefDirective {
  focus = false;
  isVisible = false;
  hide = true;

  private setType(arg) {
    return arg ? 'text' : 'password';
  }

  @HostListener('focus')
  onFocus() {
    this.focus = true;
  }

  @HostListener('blur')
  onBlur() {
    this.focus = false;
  }

  @HostBinding('type') type = this.setType(this.isVisible);

  toggleType() {
    this.isVisible = !this.isVisible;
    this.hide = !this.hide;
    this.type = this.setType(this.isVisible);
  }
}
