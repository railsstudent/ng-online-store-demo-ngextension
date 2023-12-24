import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, forkJoin, map, Observable, of, shareReplay, switchMap } from 'rxjs';
import { Product } from '../interfaces/product.interface';

const PRODUCTS_URL = 'https://fakestoreapi.com/products';
const FEATURED_PRODUCTS_URL = 'https://gist.githubusercontent.com/railsstudent/ae150ae2b14abb207f131596e8b283c3/raw/131a6b3a51dfb4d848b75980bfe3443b1665704b/featured-products.json';

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

  getFeaturedProducts() {
    return this.httpClient.get<{ ids: number[] }>(FEATURED_PRODUCTS_URL)
      .pipe(
        map(({ ids }) => ids), 
        switchMap((ids) => {
          const observables$ = ids.map((id) => this.getProduct(id));
          return forkJoin(observables$);
        }),
        map((productOrUndefinedArrays) => {
          const products: Product[] = [];
          productOrUndefinedArrays.forEach((p) => {
            if (p) {
              products.push(p);
            }
          });
          return products;
        }),
      );
  }
}