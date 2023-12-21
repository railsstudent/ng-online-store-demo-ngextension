import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { connect } from 'ngxtension/connect';
import { injectNavigationEnd } from 'ngxtension/navigation-end';
import { map, tap } from 'rxjs';

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
      <a [routerLink]="['my-cart']">View Cart</a>
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

  constructor() {
    const cdr = inject(ChangeDetectorRef);
    const excludedRoutes = ['/', '/products'];
    const isShowHomeButton$ = injectNavigationEnd()
      .pipe(
        map(({url, urlAfterRedirects}) => 
          !excludedRoutes.includes(url) && !excludedRoutes.includes(urlAfterRedirects)),
        tap(() => cdr.markForCheck())
      );
    connect(this.isShowHomeButton, isShowHomeButton$);
  }
}
