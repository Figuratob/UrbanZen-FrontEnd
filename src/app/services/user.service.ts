import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from "rxjs";
import {ConfigService} from "./config.service";

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient,
              protected configService: ConfigService) {
  }

  register(account: any): Observable<any> {
    return this.http.post(this.configService.config.url +'api/register', account);
  }
}
