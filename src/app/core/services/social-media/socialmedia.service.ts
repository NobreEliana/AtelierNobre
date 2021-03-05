import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseServices } from '../base.services';

@Injectable({
  providedIn: 'root'
})
export class SocialMediaService extends BaseServices{

  constructor(private _http: HttpClient, @Inject("BASE_URL") private BASE_URL:string) {super(); }

  list():Promise<any>{
    const promise = new Promise((resolve, reject)=>{
      this._http.get<any>(this.BASE_URL + "socialmedia")
      .toPromise()
      .then((response)=>{
        resolve(response);
      },catchError(this.handleError));
    });
    return promise;    
  }
}
