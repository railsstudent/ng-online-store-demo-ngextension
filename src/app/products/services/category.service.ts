import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { shareReplay } from 'rxjs';
import { Product } from '../interfaces/product.interface';

const CATEGORIES_URL = 'https://fakestoreapi.com/products/categories';
const CATEGORY_URL = 'https://fakestoreapi.com/products/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private readonly httpClient = inject(HttpClient);

  categories$ = this.httpClient.get<string[]>(CATEGORIES_URL).pipe(shareReplay(1));

  getCategory(category: string) {
    this.httpClient.get<Product[]>(`${CATEGORY_URL}/${category}`).pipe(shareReplay(1));
  }
}