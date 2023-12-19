import { ApplicationConfig } from '@angular/core';
import { TitleStrategy, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { ShopPageTitleStrategy } from './shop-page-title.strategy';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    {
      provide: TitleStrategy,
      useClass: ShopPageTitleStrategy,
    }
  ]
};
