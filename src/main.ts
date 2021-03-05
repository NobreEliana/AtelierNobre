import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import 'hammerjs';

export function getBaseUrl() {
  return "http://localhost:5000/api/";
}

export function getBaseUrlProd() {
  return "http://api.hnlcompany.com/api/";
}



const providers = [
  { provide: 'BASE_URL', useFactory: environment.production? getBaseUrlProd: getBaseUrl, deps: [] }
];

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic(providers).bootstrapModule(AppModule)
  .catch(err => console.log(err));


 
