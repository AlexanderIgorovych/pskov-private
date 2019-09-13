import {Component, ContentChild, HostBinding} from '@angular/core';
import {InputRefDirective} from '../../directives/input-ref.directive';

@Component({
  selector: 'app-input-main',
  templateUrl: './input-main.component.html',
  styleUrls: ['./input-main.component.scss']
})
export class InputMainComponent {

  @ContentChild(InputRefDirective)
  input: InputRefDirective;

  @HostBinding('class.focus')
  get focus() {
    return this.input ? this.input.focus : false;
  }
}
