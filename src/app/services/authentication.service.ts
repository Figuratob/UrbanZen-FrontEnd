import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {map} from 'rxjs/operators';

import {ConfigService} from "./config.service";

@Injectable({providedIn: 'root'})
export class AuthenticationService {

  private authenticated = false;
  private userIdentity: any;
  private authenticationState = new Subject<any>();


  constructor(
    private http: HttpClient,
    protected configService: ConfigService) {

    if (localStorage.getItem('token')) {
      this.authenticated = true;
    }
  }

  public getToken() {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  login(username: string, password: string, rememberMe): Observable<any> {
    return this.http.post<any>(this.configService.config.url + 'api/authenticate', {username, password, rememberMe})
      .pipe(map(login => {

        // login successful if there's a jwt token in the response
        if (login) {

          const token = login['id_token'];

          // store jwt token in local storage to keep user logged in if he refresh browser and between browser sessions
          localStorage.setItem('token', token);
        }
        return login;
      }));
  }
  identity(force?: boolean): Promise<Account> {
    if (force) {
      this.userIdentity = undefined;
    }

    // check and see if we have retrieved the userIdentity data from the server.
    // if we have, reuse it by immediately resolving
    if (this.userIdentity) {
      return Promise.resolve(this.userIdentity);
    }

    // retrieve the userIdentity data from the server, update the identity object, and then resolve.
    return this.fetch()
      .toPromise()
      .then(response => {
        const account: Account = response.body;
        if (account) {
          this.userIdentity = account;
          this.authenticated = true;
        } else {
          this.userIdentity = null;
          this.authenticated = false;
        }
        this.authenticationState.next(this.userIdentity);
        return this.userIdentity;
      })
      .catch(err => {
        this.userIdentity = null;
        this.authenticated = false;
        this.authenticationState.next(this.userIdentity);
        return null;
      });
  }
  fetch(): Observable<HttpResponse<Account>> {
    return this.http.get<Account>(this.configService.config.url + 'api/account', { observe: 'response' });
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('token')) {
      this.authenticated = true;
    }
    return this.authenticated;
  }

  save(account: any): Observable<HttpResponse<any>> {
    return this.http.post(this.configService.config.url + 'api/account', account, {observe: 'response'});
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.clear();
    this.authenticated = false;
  }
}
