import {
  Directive,
  ElementRef,
  HostListener,
  HostBinding,
  Input
} from '@angular/core';

@Directive({
  selector: '[appFocus]'
})
export class FocusDirective {
  constructor(el: ElementRef) {}
  @Input() activeBorder = '1px solid #109754';
  @Input() regularBorder = '1px solid #bab9b9';
  private focus = false;

  @HostBinding('style.border') border = this.regularBorder;
  @HostListener('focus') onFocus() {
    this.changeColor(true);
  }
  @HostListener('blur') blur() {
    this.changeColor(false);
  }

  changeColor(state) {
    this.border = state ? this.activeBorder : this.regularBorder;
  }
}
