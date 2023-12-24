import { Component, inject, signal } from '@angular/core';
import { connect } from 'ngxtension/connect';
import { finalize } from 'rxjs';
import { Product } from '../interfaces/product.interface';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-feature-products',
  standalone: true,
  imports: [ProductComponent],
  template: `
    @if (products(); as products) {
      <h2>Featured Products</h2>
      <div class="featured">
        @if (isLoading) {
          <p>Loading featured products...</p>
        } @else {
          @for (product of products; track product.id) {
            <app-product [product]="product" class="item" />
          }
        }
      </div>
      <hr>
    }
  `,
  styles: `
    h2, hr {
      margin-bottom: 0.5rem;
    }

    div.featured {
      display: flex;
      flex-wrap: wrap;

      margin-bottom: 0.75rem;
    }

    div.featured > .item {
      flex-basis: 250px;
    }
  `,
})
export class FeatureProductsComponent {
  products = signal<Product[]>([]);
  isLoading = false;

  constructor() {
    const productService = inject(ProductService);
    this.isLoading = true;
    const featuredProducts$ = productService.getFeaturedProducts()
      .pipe(finalize(() => this.isLoading = false));

    connect(this.products, featuredProducts$);
  }
}