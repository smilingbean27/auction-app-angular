import { Injectable } from '@angular/core';
import { Product } from '../base/product';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

const {baseUrl} = environment;

@Injectable({
  providedIn: 'root'
})
export class AuctionService {
  

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${baseUrl}/api/products`)
  }

  addProduct(product: Product): void{
    this.http.post<Product>(`${baseUrl}/api/products`, product, this.httpOptions)
    .subscribe(product => console.log(product));
  }

  getProductById(id: string | null): Observable<Product>{
    console.log(id, typeof id);
    return this.http.get<Product>(`${baseUrl}/api/product/${id}`);
  }

  removeProduct(product: Product){
    this.http.delete<void>(`${baseUrl}/api/product/${product._id}`, this.httpOptions)
    .pipe(
      catchError(err=> {
        console.log(err);
        return of(err);
      })
    )
    .subscribe(val => console.log(val));
  }

  editProduct(product: Product){
    console.log(product._id)
    this.http.put<Product>(`${baseUrl}/api/product/${product._id}`, product, this.httpOptions)
    .subscribe(product => console.log('Producted edited', product))
  }

}
