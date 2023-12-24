import { CategoryService } from '../services/category.service';
import { ProductComponent } from './../../products/product/product.component';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [ProductComponent],
  template: `
    <p>
      category-products works!
    </p>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryProductsComponent {
  categoryService = inject(CategoryService);
}
