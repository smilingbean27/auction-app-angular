import { Injectable } from '@angular/core';
import { User } from '../base/user';
import { Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  users: User[] = [];
  authenticated$ = new Subject<boolean>();

  constructor(private http: HttpClient){
    localStorage.setItem('user-authenticated', String(false));
    this.authenticated$.subscribe(val =>{
      console.log('From user Service subscribtion',val);
      localStorage.setItem('user-authenticated', String(val))
    } );
  }

  isAuthenticated(){
    return localStorage.getItem('user-authenticated') === 'true' ? true: false;
  }

  setAuthentication(val: boolean){
    this.authenticated$.next(val);
  }

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  verifyUser(user: User): void {
    this.http.post<User>('/api/authenticate', user)
    .subscribe(data =>{
      if (data.email) this.authenticated$.next(true)
      else this.authenticated$.next(false)
    } ); 
  }
}
