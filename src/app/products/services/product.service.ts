import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, of, shareReplay } from 'rxjs';
import { Product } from '../interfaces/product.interface';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly httpClient = inject(HttpClient);

  products$ = this.httpClient.get<Product[]>(PRODUCTS_URL).pipe(shareReplay(1));

  getProduct(id: number): Observable<Product | undefined> {
    return this.httpClient.get<Product>(`${PRODUCTS_URL}/${id}`)
      .pipe(
        catchError((err) => {
          console.error(err);
          return of(undefined)
        })
      );
  }

}