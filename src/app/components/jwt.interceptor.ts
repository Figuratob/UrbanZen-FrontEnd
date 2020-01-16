import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

import {AuthenticationService} from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: AuthenticationService,
  ) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // add authorization header with jwt token if available

    let token = this.authenticationService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          // Authorization: `Bearer ${token}`
          Authorization: 'Bearer ' + token

        }
      })
    }
    ;

    // let currentUser = this.authenticationService.currentUserValue;
    // console.log(currentUser);
    //
    // if (currentUser && currentUser.token) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${currentUser.token}`
    //     }
    //   });
    // }

    return next.handle(request);
  }
}
