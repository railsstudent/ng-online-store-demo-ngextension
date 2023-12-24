import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Signal, inject } from '@angular/core';
import { computedFrom } from 'ngxtension/computed-from';
import { finalize, map, pipe, startWith } from 'rxjs';
import { CategoryProducts } from '../interfaces/category-products.interface';
import { Product } from '../interfaces/product.interface';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent, TitleCasePipe],
  template: `
    <h2>Catalogue</h2>
    <div>
      @if (isLoading) {
        <p>Loading products...</p>
      } @else {
        @for (catProducts of categoryProducts(); track catProducts.category) {
          <p>{{ catProducts.category | titlecase }}</p>
          <div class="products">
            @for(product of catProducts.products; track product.id) {
              <app-product [product]="product" />
            }
          </div>
        }
      }
    </div>
  `,
  styles: [`
    div.products {
      display: flex;
      flex-wrap: wrap;
      align-content: stretch;
    }

    app-product {
      flex-basis: 250px;
      height: 300px;
      margin-bottom: 1rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent {
  categoryProducts!: Signal<CategoryProducts[]>;
  isLoading = false;
  
  constructor() {
    const productService = inject(ProductService);
    const cdr = inject(ChangeDetectorRef);
    const queries = [
      productService.categories$,
      productService.products$,
    ];

    this.isLoading = true;
    this.categoryProducts = computedFrom(queries, 
      pipe(
        map((results) => {
          const categories = results[0] as string[];
          const products = results[1] as Product[];
          return categories.reduce((acc, c) => {
            const matched = products.filter(({ category }) => category === c);

            return acc.concat({
              category: c,
              products: matched,
            });
          }, [] as CategoryProducts[]);
        }),
        finalize(() => { 
          this.isLoading = false;
          cdr.markForCheck();
        }),
        startWith([] as CategoryProducts[])
      ),
    );
  }
}
