import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import {ConfigService} from "../../../services/config/config.service";

@Injectable({ providedIn: 'root' })
export class ActivateService {
  constructor(private http: HttpClient,
              protected configService: ConfigService) {}

  get(key: string): Observable<any> {
    return this.http.get(this.configService.config.url + 'api/activate', {
      params: new HttpParams().set('key', key)
    });
  }
}
