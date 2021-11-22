import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  addProductUrl: string
  getAllProductUrl: string
  editProductUrl: string
  constructor(private http: HttpClient) {
    this.addProductUrl = 'http://localhost:8080/products'
    this.getAllProductUrl = 'http://localhost:8080/products'
    this.editProductUrl = 'http://localhost:8080/products/'
  }

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.addProductUrl, product)
  }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(this.getAllProductUrl)
  }
  
  editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(this.editProductUrl + product.id, product)
  }

  deleteProduct(product: Product): Observable<Product> {
    return this.http.delete<Product>(this.editProductUrl + product.id)
  }

}
