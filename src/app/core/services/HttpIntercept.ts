import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../auth/token.service';

@Injectable()
export class HttpIntercept implements HttpInterceptor {
  tokenService;
  constructor(inj: Injector) {
    this.tokenService = inj.get(TokenService);
  }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const AUTH_TOKEN = this.tokenService.create();
    const url = 'https://api-dev.pskovvtormet.ru/api/v1/';
    const headers = req.headers.set('Authorization', AUTH_TOKEN);
    req = req.clone({
      url: url + req.url,
      headers
    });
    return next.handle(req);
  }
}
