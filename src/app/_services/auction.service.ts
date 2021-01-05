import { Injectable } from '@angular/core';
import { Product } from '../base/product';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

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
    return this.http.get<Product[]>('/api/products')
  }

  addProduct(product: Product): void{
    this.http.post<Product>('/api/products', product, this.httpOptions)
    .subscribe(product => console.log(product));
  }

  getProductById(id: string | null): Observable<Product>{
    return this.http.get<Product>(`/api/product/${id}`);
  }

  removeProduct(product: Product){
    console.log(product.id)
    this.http.delete<void>(`/api/product/${product.id}`, this.httpOptions)
    .pipe(
      catchError(err=> {
        console.log(err);
        return of(err);
      })
    )
    .subscribe(val => console.log(val));
  }

  editProduct(product: Product){
    this.http.put<Product>(`/api/product/${product.id}`, product, this.httpOptions)
    .subscribe(product => console.log('Producted edited', product))
  }

}
