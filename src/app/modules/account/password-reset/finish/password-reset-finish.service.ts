import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {ConfigService} from "../../../../services/config/config.service";

@Injectable({ providedIn: 'root' })
export class PasswordResetFinishService {
  constructor(private http: HttpClient,
              protected configService: ConfigService) {}

  save(keyAndPassword: any): Observable<any> {
    return this.http.post( this.configService.config.url + 'api/account/reset-password/finish', keyAndPassword);
  }
}
