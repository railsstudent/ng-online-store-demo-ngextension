import { inject, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { map, Subscription } from 'rxjs';
import { ProductService } from './products/services/product.service';

@Injectable()
export class ShopPageTitleStrategy extends TitleStrategy {
  title = inject(Title);
  productService = inject(ProductService);
  subscription: Subscription | null = null;
  
  updateTitle(snapshot: RouterStateSnapshot): void {
    this.subscription?.unsubscribe();

    const customTitle = this.buildTitle(snapshot) || '';
    const firstChild = snapshot.root.firstChild;
    const productId = firstChild?.params['id'] || '';
    const category = firstChild?.params['category'] || '';
    if (productId) {
      this.subscription = this.productService.getProduct(productId)
        .pipe(
          map((product) => product?.title || ''),
          map((productTitle) => `${customTitle} - ${productTitle}`),
        )
        .subscribe((pageTitle) => this.title.setTitle(pageTitle));
    } else if (category) {
      this.title.setTitle(`${customTitle} - ${category}`)
    } else {
      this.title.setTitle(customTitle);
    }
  }

}
