import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ConfigService} from "../../../services/config/config.service";

@Injectable({providedIn: 'root'})
export class PasswordService {
  constructor(private http: HttpClient,
              protected configService: ConfigService) {
  }

  save(newPassword: string, currentPassword: string): Observable<any> {
    return this.http.post(this.configService.config.url + 'api/account/change-password', {currentPassword, newPassword});
  }
}
