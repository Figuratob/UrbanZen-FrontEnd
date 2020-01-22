import {Injectable} from '@angular/core';
// import { JhiLanguageService } from 'ng-jhipster';
import {SessionStorageService} from 'ngx-webstorage';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Account} from '../../../model/account.model';

@Injectable({providedIn: 'root'})
export class AccountService {
  private userIdentity: any;
  private authenticated = false;
  private authenticationState = new Subject<any>();

  constructor(
    // private languageService: JhiLanguageService,
    private sessionStorage: SessionStorageService,
    private http: HttpClient) {
  }

  fetch(): Observable<HttpResponse<Account>> {
    return this.http.get<Account>('http://localhost:8080/api/account', {observe: 'response'});
  }

  save(account: any): Observable<HttpResponse<any>> {
    return this.http.post('http://localhost:8080/api/account', account, {observe: 'response'});
  }

  logout(): void {
    this.authenticated = false;
    this.userIdentity = undefined;
    this.authenticationState.next(this.userIdentity);
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
          // After retrieve the account info, the language will be changed to
          // the user's preferred language configured in the account setting

          // if (this.userIdentity.langKey) {
          //   const langKey = this.sessionStorage.retrieve('locale') || this.userIdentity.langKey;
          //   // this.languageService.changeLanguage(langKey);
          // }
        } else {
          this.userIdentity = null;
          this.authenticated = false;
        }
        this.authenticationState.next(this.userIdentity);
        return this.userIdentity;
      })
      .catch(err => {
        console.log("exception caught: ", err);
        this.logout();
        return null;
      });
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }
}
