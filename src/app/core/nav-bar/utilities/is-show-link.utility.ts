import { Injector, inject, ChangeDetectorRef } from '@angular/core';
import { assertInjector } from 'ngxtension/assert-injector';
import { injectNavigationEnd } from 'ngxtension/navigation-end';
import { map, tap } from 'rxjs';

export const isShowLink = (excludedRoutes: string[], injector?: Injector) => {
    return assertInjector(isShowLink, injector, () => {
      const assertedInject = inject(Injector);
      const cdr = assertedInject.get(ChangeDetectorRef);
  
      return injectNavigationEnd()
        .pipe(
            map(({url, urlAfterRedirects}) => 
            !excludedRoutes.includes(url) && !excludedRoutes.includes(urlAfterRedirects)),
            tap(() => cdr.markForCheck())
        );  
    });
}
