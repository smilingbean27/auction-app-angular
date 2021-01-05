
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith } from 'rxjs/operators'
import { User } from '../base/user';
import { users }from '../_data/user-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AdminDataService {

  users: User[] = users;
  authenticated$ = new Subject<boolean>();

  constructor(private http: HttpClient){
    localStorage.setItem('authenticated', String(false));
    this.authenticated$.subscribe(val =>{
      console.log('From user Service subscribtion',val);
      localStorage.setItem('authenticated', String(val))
    } );
  }

  isAuthenticated(){
    console.log(localStorage.getItem('authenticated'))
    return localStorage.getItem('authenticated') === 'true' ? true: false;
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
