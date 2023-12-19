import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { map, tap } from 'rxjs';
import { injectNavigationEnd } from 'ngxtension/navigation-end';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  template: `
    <div>
      @if (isShowHomeButton$ | async) {
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
  cdr = inject(ChangeDetectorRef);

  // isShowHomeButton$ = isCurrentUrlIncludedFn('/', '/products')
  //   .pipe(tap(() => this.cdr.markForCheck()));

  excludedRoutes = ['/', '/products'];
  isShowHomeButton$ = injectNavigationEnd()
    .pipe(
      map(({url, urlAfterRedirects}) => 
        !this.excludedRoutes.includes(url) && !this.excludedRoutes.includes(urlAfterRedirects)),
      tap(() => this.cdr.markForCheck())
    );  
}
