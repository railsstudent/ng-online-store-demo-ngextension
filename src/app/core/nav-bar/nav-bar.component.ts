import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { connect } from 'ngxtension/connect';
import { isShowLink } from './utilities/is-show-link.utility';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div>
      @if (isShowHomeButton()) {
        <a routerLink="/">Home</a>
      } @else {
        <span>&nbsp;</span>
      }
      @if (isShowViewCartButton()) {
        <a [routerLink]="['my-cart']">View Cart</a>
      } @else {
        <span>&nbsp;</span>
      }
    </div>
  `,
  styles: [`
    div {
      background: goldenrod;
      height: 50px;
      padding: 0.25rem;
      margin-bottom: 1rem;

      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavBarComponent {
  isShowHomeButton = signal(false);
  isShowViewCartButton = signal(false);

  constructor() {
    connect(this.isShowHomeButton, isShowLink(['/', '/products']));
    connect(this.isShowViewCartButton, isShowLink(['/my-cart']));
  }
}
