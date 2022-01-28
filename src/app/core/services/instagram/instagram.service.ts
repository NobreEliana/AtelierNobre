import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Instagram, InstaMedia } from 'src/app/shared/models/instagram';
import { Result } from 'src/app/shared/models/result';

@Injectable({
  providedIn: 'root'
})
export class InstagramService {

  

  constructor(@Inject("BASE_URL_INSTAGRAM") private BASE_URL_INSTAGRAM:string  ,private http: HttpClient) { }

  async getInstagramMedia(insta:Instagram): Promise<Result<InstaMedia[]>> {
    const promise = new Promise<Result<InstaMedia[]>>((resolve) => {
      this.http.get<Result<InstaMedia[]>>(this.BASE_URL_INSTAGRAM + "/Instagram/GetInstagramMedia?qtd_media=" + insta.qtdMedia + "&company_name=" + insta.companyName)
        .toPromise().then((response) => {
          return resolve(response);
        });
    });
    return promise;
  }
}
