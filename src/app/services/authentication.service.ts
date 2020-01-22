import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {LocalStorageService} from "ngx-webstorage";
import {AccountService} from "../modules/general/account/account.service";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private force: boolean;

  constructor(
    private http: HttpClient,
    private $localStorage: LocalStorageService,
    private accountService: AccountService
  ) {
  }

  public getToken() {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  login(username: string, password: string, rememberMe): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/authenticate', {username, password, rememberMe})
      .pipe(map(resp => {

        const token = resp['id_token'];
        // store jwt token in local storage to keep user logged in if he refresh browser and between browser sessions
        localStorage.setItem('token', token);
        this.accountService.identity();
        return resp;
      }));
  }

  getCurrentUser() {
    return this.http.get<any>('http://localhost:8080/api/account', {observe: 'response'});
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.force = true;
    this.accountService.logout();
    console.log(this.accountService.isAuthenticated() + " user is authenticated!!");
  }
}
