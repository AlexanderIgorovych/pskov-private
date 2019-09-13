import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {IAppState} from '../../core/store/rootStore';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  title = 'ПСКОВВТОРМЕТ';
  constructor(
    private ngRedux: NgRedux<IAppState>
  ) {
  }

  ngOnInit() {
    // this.ngRedux.dispatch({type: "asdasdasd"})
  }

}
