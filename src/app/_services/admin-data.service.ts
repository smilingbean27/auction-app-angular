
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../base/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AdminDataService {

  adminIsAuthenticated$ = new Subject<boolean>();
  userIsAuthenticated$ = new Subject<boolean>();
  
  constructor(private http: HttpClient){
    localStorage.setItem('authenticated', String(false));
    this.adminIsAuthenticated$.subscribe(val =>{
      console.log('From Admin Service subscribtion',val);
      localStorage.setItem('authenticated', String(val))
    } );
  }

  // isAuthenticated(){
  //   console.log(localStorage.getItem('authenticated'))
  //   return localStorage.getItem('authenticated') === 'true' ? true: false;
  // }

  setAuthentication(val: boolean, user: String){
    if (user === 'admin') this.adminIsAuthenticated$.next(val);
    else if (user === 'user') this.userIsAuthenticated$.next(val);
  }

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  verifyUser(admin: User, adminRoute: boolean): void {
    this.http.post<any>('/api/authenticate', {...admin, adminRoute}, {...this.httpOptions, params: new HttpParams().set('adminRoute', String(adminRoute))})
    .subscribe(user =>{
      if (user && user.isAdmin) this.adminIsAuthenticated$.next(true)
      if (user && !user.isAdmin) this.userIsAuthenticated$.next(true)
    } ); 
  }

}
