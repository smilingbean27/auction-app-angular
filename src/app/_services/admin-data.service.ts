
import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { User } from '../base/user';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { startWith } from 'rxjs/operators';

const {baseUrl} = environment;

@Injectable({
  providedIn: 'root'
})

export class AdminDataService {

  userData$ = new Subject<String>();
  
  constructor(private http: HttpClient){
    this.userData$.pipe(
      startWith('')
    )
  }

  setUserInStorage(item: string): void{
    console.log(item);
    localStorage.setItem('user', item);
    this.userData$.next(item);
    
  }

  getUserFromStorage(): User | null{
    const val = localStorage.getItem('user');
    if (val) {
      return JSON.parse(val);
    }else{
      return null;
    }
  }

  checkAuthentication(): boolean{
    const user = this.getUserFromStorage();
    return user?.name ? true: false; 
  }

  // setAuthentication(val: boolean, user: String){
  //   if (user === 'admin') this.adminIsAuthenticated$.next(val);
  //   else if (user === 'user') this.userIsAuthenticated$.next(val);
  // }

  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  addUser(user: User ):void{
    this.http.post<User | null>(`${baseUrl}/api/user/add`, user, this.httpOptions)
    .subscribe(data => {
      console.log(data);
      if(data) this.setUserInStorage(JSON.stringify(data));
    })
  }

  verifyUser(user: User, adminRoute: boolean): void {
    this.http.post<any>(`${baseUrl}/api/user/authenticate`, {...user, adminRoute})
    .subscribe(({data, info}) =>{
      if (data) this.setUserInStorage(JSON.stringify(data));

      if (info) console.log(info);
    } ); 
  }

}
