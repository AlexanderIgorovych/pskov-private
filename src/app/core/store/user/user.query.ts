import {Injectable} from '@angular/core';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserQuery {
  @select(s => s.user.isAuth)
  private isAuth: Observable<boolean>;

  @select(s => s.user.name)
  private fullName: Observable<string>;

  @select(s => s.user.token)
  private token: Observable<string>;


  // Exports
  getAuth(): Observable<boolean> {
    return this.isAuth;
  }

  getFullName(): Observable<string> {
    return this.fullName;
  }

  getToken(): Observable<string> {
    return this.token;
  }
}
