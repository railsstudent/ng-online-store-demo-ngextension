import { Component, Input, OnInit, inject, Injector, Signal } from '@angular/core';
import { concatMap, from, pipe, toArray } from 'rxjs';
import { computedFrom } from 'ngxtension/computed-from';
import { filterUndefined } from 'ngxtension/map-skip-undefined';
import { ProductComponent } from '../product/product.component';
import { ProductService } from '../services/product.service';
import { Product } from '../interfaces/product.interface';

@Component({
  selector: 'app-feature-products',
  standalone: true,
  imports: [ProductComponent],
  template: `
    @if (products(); as products) {
      <h2>Featured Products</h2>
      <div class="featured">
        @for (product of products; track product.id) {
          <app-product [product]="product" class="item" />
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
export class FeatureProductsComponent implements OnInit {

  @Input({ required: true })
  ids!: number[];

  private readonly productService = inject(ProductService);
  injector = inject(Injector);
  products!: Signal<Product[]>;

  ngOnInit(): void {
    const queries = this.ids.map((id) => this.productService.getProduct(id));
    this.products = computedFrom(queries, 
      pipe(
        concatMap((products) => from(products)),
        filterUndefined(),
        toArray()
      ),
      { initialValue: [] as Product[], injector: this.injector }
    )
  }

}