import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, numberAttribute, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { connect } from 'ngxtension/connect';
import { injectParams } from 'ngxtension/inject-params';
import { CartService } from '../../carts/services/cart.service';
import { Product } from '../interfaces/product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [TitleCasePipe, FormsModule, RouterLink],
  template: `
    <div>
      @if (product(); as product) {
        <div class="product">
          <div class="row">
            <img [src]="product.image" [attr.alt]="product.title || 'product image'" width="200" height="200" />
          </div>
          <div class="row">
            <span>id:</span>
            <span>{{ product.id }}</span>
          </div>
          <div class="row">
            <span>Category: </span>
            <span>
              <a [routerLink]="['/categories', product.category]">{{ product.category | titlecase }}</a>
            </span>
          </div>
          <div class="row">
            <span>Name: </span>
            <span>{{ product.title | titlecase }}</span>
          </div>
          <div class="row">
            <span>Description: </span>
            <span>{{ product.description }}</span>
          </div>
          <div class="row">
            <span>Price: </span>
            <span>{{ product.price }}</span>
          </div> 
        </div>
        <div class="buttons">
          <input type="number" class="order" min="1" [ngModel]="quantity()" (ngModelChange)="quantity.set($event)" />
          <button (click)="addItem()">Add</button>
        </div>
      } @else {
        <p>Product is invalid</p>
      }
    </div>
  `,
  styles: [`
    .product, .buttons {
      margin-bottom: 1rem;
    }

    .row > span {
      display: inline-block;
      margin-bottom: 0.25rem;
    }

    .row > span:first-of-type {
      color: #aaa;
      width: 20%;
    }

    .row > span:nth-of-type(2) {
      width: 80%;
    }

    input.order {
      width: 100px;
      height: 30px;
      margin-right: 0.5rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  id = injectParams((params) => numberAttribute(params?.['id'], 1));
  product = signal<Product | undefined>(undefined);
  cartService = inject(CartService);
  quantity = signal(1);

  constructor() {
    const productService = inject(ProductService);
    connect(this.product, productService.getProduct(this.id()));
  }

  addItem() {
    const product = this.product();
    if (product) {
      this.cartService.addItem(product, this.quantity());
    }
  }
}
