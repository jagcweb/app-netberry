import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { apiUrl } from '../global/global';
import { ITask } from '../../models/task/task.model';

@Injectable()
export class TaskService {
  private _refresh$ = new Subject<void>();

  constructor(private _http: HttpClient) {}


  get refresh$(){
    return this._refresh$.asObservable();
  }
  
  create(task: ITask, token: string): Observable<any> {

    const headers = new HttpHeaders()
    .set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    )
    .set('Authorization', token);

    const body = new URLSearchParams();
    body.set('name', task.name);
    body.set('done', task.done);


    const url = `${apiUrl}create`;

    return this._http.post(url, body.toString(), { headers: headers }).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  get(token: string | null): Observable<any> {
    const url = `${apiUrl}get-tasks/${token}`;

    return this._http.get(url);
  }

  update(task: ITask, id: number): Observable<any> {
    const headers = new HttpHeaders()
    .set(
      'Content-Type',
      'application/x-www-form-urlencoded'
    );

    const body = new URLSearchParams();
    body.set('name', task.name);
    body.set('done', task.done);

    const url = `${apiUrl}update/${id}`;

    return this._http.put(url, body.toString(), { headers: headers }).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }

  delete(id: number): Observable<any> {
    const url = `${apiUrl}delete/${id}`;

    return this._http.delete(url).pipe(
      tap(() => {
        this._refresh$.next();
      })
    );
  }
}