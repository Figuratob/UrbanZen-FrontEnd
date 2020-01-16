import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {User} from '../model/user.model';
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class UserService {
  constructor(private http: HttpClient) {
  }

  getAll() {
    return this.http.get<User[]>(`/users`);
  }

  register(account: any): Observable<any> {
    return this.http.post('http://localhost:8080/api/register', account);
  }

  delete(id: number) {
    return this.http.delete(`/users/${id}`);
  }
}
