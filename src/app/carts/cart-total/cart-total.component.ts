import { PercentPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { computedPrevious } from 'ngxtension/computed-previous';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart-total',
  standalone: true,
  imports: [PercentPipe],
  template: `
    @if (summary(); as data) {
      <div class="summary">
        <div class="row">
          <div class="col">Qty: {{ data.quantity }}</div>
          <div class="col">Subtotal: {{ data.subtotal }}</div>
        </div>
        @if (discountPercent() > 0) {
          <div class="row">
            <div class="col">Minus {{ discountPercent() | percent:'2.2-2' }}</div> 
            <div class="col">Discount: {{ data.discount }}</div>
          </div>
        }
        <div class="row">
          <div class="col">&nbsp;</div> 
          <div class="col">Total: {{ data.total }}</div>
        </div>
      </div>
    }
  `,
  styles: [`
    .summary {
      border: 1px solid black;
      margin-bottom: 1rem;
    }

    .row {
      display: flex;
      justify-content: flex-end;
    }

    .col {
      width: 20%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartTotalComponent {
  cartService = inject(CartService);
  summary = this.cartService.summary;
  discountPercent = this.cartService.discountPercent;

  constructor() {
    const lastDiscount = computedPrevious(this.discountPercent);

    effect(() => {
      const trackDiscount = `Discount changes from ${lastDiscount()} to ${this.discountPercent()}`;
      console.log(trackDiscount);
    });
  }
}