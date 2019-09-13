import { Directive, ElementRef, Input, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
  selector: '[appDirty]'
})
export class DirtyDirective {

  @Output('appDirty') appDirty = new EventEmitter();

  constructor(private el: ElementRef ) { }

  @HostListener('blur') onBlur() {
    this.appDirty.emit();
  }

  @HostListener('keyup') onKeyup() {
    this.appDirty.emit();
  }

}
