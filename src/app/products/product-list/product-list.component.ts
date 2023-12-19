import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { connect } from 'ngxtension/connect';
import { Product } from '../interfaces/product.interface';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductComponent],
  template: `
    <div>
      @for (product of products(); track product.id) {
        <app-product [product]="product" />
      }
    </div>
  `,
  styles: [`
    div {
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
  // Before:
  // products = toSignal(inject(ProductService).products$, {
  //   initialValue: [] as Product[]
  // });

  // After:
  products = signal<Product[]>([]);
  
  constructor() {
    connect(this.products, inject(ProductService).products$);
  }
}