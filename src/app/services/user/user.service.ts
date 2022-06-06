import { Injectable } from '@angular/core';
import { IUser } from '../../models/user/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiUrl } from '../global/global';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(public _http: HttpClient) {}

  create(user: IUser): Observable<any> {

    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    const body = new URLSearchParams();
    body.set('name', user.name);
    body.set('surname', user.surname);
    body.set('email', user.email);
    body.set('password', user.password);


    const url = apiUrl + 'register';

    return this._http.post(url, body.toString(), { headers: headers });
  }

  login(user: IUser): Observable<any> {
    const headers = new HttpHeaders().set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('password', user.password);


    const url = apiUrl + 'login';

    return this._http.post(url, body.toString(), { headers: headers });
  }

  get(token: string | null): Observable<any> {
    const url = `${apiUrl}get/${token}`;

    return this._http.get(url);
  }

  logout(): IUser | null {
    return null
  }
}
