import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService {

  constructor(private _http: HttpClient, @Inject("BASE_URL_ARTICLE") private BASE_URL_ARTICLE: string) { }

  GetList(): Promise<any> {
    const promise = new Promise((resolve, reject) => {
      // this._http.get<any>(this.BASE_URL_ARTICLE + "socialmedia")
      //   .toPromise()
      //   .then((response) => {
      //     return resolve(response);
      //   }, error => resolve(error));
      let socialmedia = [
        { "id": 1, "name": "Facebook", "icon": "facebook", "link": "facebook/ateliernobre" },
        { "id": 2, "name": "Twitter", "icon": "twitter", "link": "twitter/ateliernobre" },
        { "id": 3, "name": "Pinterest", "icon": "pinterest", "link": "https://br.pinterest.com/ateliernobree/_created/" },
        { "id": 4, "name": "Instagram", "icon": "instagram", "link": "https://www.instagram.com/ateliernobree/?hl=pt-br" },
        { "id": 5, "name": "Tumblr", "icon": "tumblr", "link": "tumblr/ateliernobre" },
        { "id": 6, "name": "Youtube", "icon": "youtube", "link": "https://www.youtube.com/channel/UCXpDicZvj7vPf4k9sTK8Mkw/featured" }
      ];
      resolve(socialmedia);
    });
    return promise;
  }
}
