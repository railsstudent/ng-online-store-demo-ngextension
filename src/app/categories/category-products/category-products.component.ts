import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Params } from '@angular/router';
import { connect } from 'ngxtension/connect';
import { injectParams } from 'ngxtension/inject-params';
import { Product } from '../../products/interfaces/product.interface';
import { CategoryService } from '../services/category.service';
import { ProductComponent } from './../../products/product/product.component';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [ProductComponent, TitleCasePipe],
  template: `
    <h2>{{ category() | titlecase }}</h2>
    @if (products().length > 0) {
      <div class="products">
        @for(product of products(); track product.id) {
          <app-product [product]="product" />
        }
      </div>
    } @else {
      <p>Category does not have products</p>
    }
  `,
  styles: `
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryProductsComponent {
  category = injectParams<string>((params: Params) => params['category'] || '');
  products = signal<Product[]>([]);

  constructor() {
    const categoryService = inject(CategoryService);

    if (this.category()) {
      connect(this.products, categoryService.getCategory(this.category()));
    }
  }
}
