import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Email } from 'src/app/modules/contact/email';
import { Result } from 'src/app/shared/models/result';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  

  constructor(@Inject("BASE_URL_EMAIL") private BASE_URL_EMAIL:string  ,private _http: HttpClient) { }
  create(email: Email): Promise<Result<Email>> {
    const promise = new Promise<Result<Email>>((resolve) => {
      this._http.post<Result<Email>>(this.BASE_URL_EMAIL+ "/Email/SendEmail", email)
        .toPromise().then((response) => {
          return resolve(response);
        }, error => resolve(error));
    });
    return promise;
  }
}


