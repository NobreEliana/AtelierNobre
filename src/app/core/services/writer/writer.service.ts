import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Writer } from 'src/app/shared/components/subscribe/writer';
import { Result } from 'src/app/shared/models/result';

@Injectable({
  providedIn: 'root'
})
export class WriterService{

  constructor( private _http: HttpClient, @Inject('BASE_URL_ARTICLE') private BASE_URL_ARTICLE:String, 
  private cookies:CookieService) { }

  getById(id: string): Promise<Result<Writer>> {
    const promise = new Promise<Result<Writer>>((resolve, reject) => {
      this._http.get<Result<Writer>>(this.BASE_URL_ARTICLE + "/Writer/GetById/" + id)
        .toPromise().then((response) => {
          if (response.resultCode == 200)
          this.cookies.set("companyId", response.data.companyId);
            return resolve(response);

          reject(response);
        }, (error) => reject(error));
    });
    return promise;
  }
}
