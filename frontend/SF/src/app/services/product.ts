import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { BehaviorSubject, catchError, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductServices {
  private productsApi = 'http://localhost:8081/api/products';
  productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  constructor(private http: HttpClient) {}

  post(p : Product): Observable<Product> {
    const {id, ...product} = p;
    return this.http.post<Product>(this.productsApi, p).pipe(
      tap((p) => {
        const products = this.productsSubject.getValue();
        this.productsSubject.next([...products, p]);
      })
    );
  }

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.productsApi);
  }

  getByID(id: string):Observable<Product> {
    return this.http.get<Product>(`${this.productsApi}/${id}`);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.productsApi}/${id}`).pipe(
      tap(() => {
        const products = this.productsSubject.getValue();
        this.productsSubject.next(products.filter(product => product.id !== id));
        this.getAll().subscribe(updatedProducts => {
          this.productsSubject.next(updatedProducts);
        });
      }),
      catchError((error) => {
        console.error('Delete failed', error);
        throw error;
      })
    );
  }
  update(id: string | null, p: Product): Observable<Product> {
    return this.http.put<Product>(`${this.productsApi}/${id}`, p).pipe(
    tap((updatedProduct) => {
      const products = this.productsSubject.getValue();
      const index = products.findIndex((product) => product.id === id);
      if (index !== -1) {
        products[index] = updatedProduct;
        this.productsSubject.next([...products]);
      }
    })
  );
  }
}
