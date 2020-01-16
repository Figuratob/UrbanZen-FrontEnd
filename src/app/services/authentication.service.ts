import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../model/user.model';

import {LocalStorageService, SessionStorageService} from "ngx-webstorage";
import {AccountService} from "../modules/general/account/account.service";

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;


  constructor(
    private http: HttpClient,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
    private accountService: AccountService
  ) {

    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }

  public getToken() {
    return localStorage.getItem('token');
    // || sessionStorage.getItem('token');

    // if (rememberMe) {
    //   localStorage.setItem('token', token);
    // } else {
    //   sessionStorage.setItem('token', token);
    // }

  }

  // public get currentUserValue(): User {
  //   return this.currentUserSubject.value;
  // }

  login(username: string, password: string, rememberMe): Observable<any> {
    return this.http.post<any>('http://localhost:8080/api/authenticate', {username, password, rememberMe})
      .pipe(map(resp => {

        const token = resp['id_token'];

        // let user = {
        //   login:username,
        //   token: token
        // };

        if (rememberMe) {
          localStorage.setItem('token', token);
        } else {
          sessionStorage.setItem('token', token);
        }
        // this.currentUserSubject.next(user as unknown as User);


        // if (rememberMe) {
        //   localStorage.setItem('currentUser', JSON.stringify(user));
        //   // this.$localStorage.store('currentUser', user);
        // } else {
        //   this.$sessionStorage.store('currentUser', user);
        // }
        // this.currentUserSubject.next(user as unknown as User);


        // this.getCurrentUser().subscribe(
        //   resp => {
        //     let user = resp.body;
        //     console.log(user);
        //     if (user && token) {
        //       // store user details and jwt token in local storage to keep user logged in between page refreshes
        //       localStorage.setItem('currentUser', JSON.stringify(user));
        //       this.currentUserSubject.next(user);
        //     }
        //   },
        //   error => {
        //
        //   }
        // );

        return resp;
      }));
  }

  getCurrentUser() {
    return this.http.get<any>('http://localhost:8080/api/account', {observe: 'response'});
  }

  logout() {
    // remove user from local storage to log user out

    localStorage.removeItem('token');
    // localStorage.removeItem('currentUser');
    sessionStorage.removeItem('token');
    // this.currentUserSubject.next(null);
  }
}
