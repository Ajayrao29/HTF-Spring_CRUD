import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);
  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  getAll(sortByPrice?: string): Observable<Product[]> {
    let url = this.apiUrl;
    if (sortByPrice) {
      url = `${this.apiUrl}?sortByPrice=${sortByPrice}`;
    }
    return this.http.get<Product[]>(url).pipe(
      tap((products) => this.productsSubject.next(products)),
      catchError(this.handleError)
    );
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  add(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product).pipe(
      tap((createdProduct) => {
        this.productsSubject.next([...this.productsSubject.value, createdProduct]);
      }),
      catchError(this.handleError)
    );
  }

  update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product).pipe(
      tap((updatedProduct) => {
        const updatedProducts = this.productsSubject.value.map((p) =>
          p.id === id ? updatedProduct : p
        );
        this.productsSubject.next(updatedProducts);
      }),
      catchError(this.handleError)
    );
  }

  delete(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).pipe(
      tap(() => {
        const remainingProducts = this.productsSubject.value.filter((p) => p.id !== id);
        this.productsSubject.next(remainingProducts);
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
