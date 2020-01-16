import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class PasswordService {
  constructor(private http: HttpClient) {
  }

  save(newPassword: string, currentPassword: string): Observable<any> {
    return this.http.post('http://localhost:8080/api/account/change-password', {currentPassword, newPassword});
  }
}
