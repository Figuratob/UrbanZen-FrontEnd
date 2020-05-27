import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {ConfigService} from "../../../../services/config/config.service";

@Injectable({ providedIn: 'root' })
export class PasswordResetInitService {
  constructor(private http: HttpClient,
              protected configService: ConfigService) {}

  save(mail: string): Observable<any> {
    return this.http.post(this.configService.config.url + 'api/account/reset-password/init', mail);
  }
}
