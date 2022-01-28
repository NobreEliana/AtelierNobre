import { enableProdMode, StaticProvider } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


const providers:StaticProvider[] = [
  { provide: 'BASE_URL_ARTICLE', useValue: environment.api_article_url, deps: [] },
  { provide: 'BASE_URL_IDENTITY', useValue: environment.api_identity_url, deps: [] },
  { provide: 'BASE_URL_EMAIL', useValue: environment.api_email_url, deps: [] },
  { provide: 'BASE_URL_INSTAGRAM', useValue: environment.api_instagram_url, deps: []},
  { provide: 'COMPANY_ID', useValue: environment.companyId, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.log(err));
