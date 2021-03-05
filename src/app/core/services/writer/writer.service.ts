import { HttpClient } from '@angular/common/http';
import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { BaseServices } from '../base.services';

@Injectable({
  providedIn: 'root'
})
export class WriterService extends BaseServices{

  constructor( private _http: HttpClient, @Inject('BASE_URL') private BASE_URL:String) { super() }

  get():Promise<any>{
    const promise = new Promise((resolve, reject) => {
      this._http.get<any>(this.BASE_URL+ "writer")
      .toPromise()
      .then(response=>resolve(response),error => reject(error));
    });
    return promise;
  }
}
