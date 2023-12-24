import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [],
  template: `
    <p>
      category-products works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryProductsComponent {

}
