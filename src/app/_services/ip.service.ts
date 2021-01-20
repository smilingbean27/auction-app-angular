import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {key} from './IP_API_key'

interface IP{
  ip: String;
}

@Injectable({
  providedIn: 'root'
})
export class IpService {

  constructor(private http: HttpClient) { }

  getIP(): Observable<IP>{
    return this.http.get<IP>('https://api.ipify.org?format=json');
  }

  getLocationData(){
    var ip: String = '';
    this.getIP().subscribe(
      obj => ip = obj.ip 
    )

   return this.http.get<any>(`https://geo.ipify.org/api/v1?apiKey=${key}&ipAddress=${ip}`)
  }
}
