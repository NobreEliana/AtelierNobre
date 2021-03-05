import { Injectable, Inject } from '@angular/core';
import { BaseServices } from '../base.services';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/shared/components/categories/ICategory';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService extends BaseServices {

  constructor(private _http: HttpClient, @Inject("BASE_URL") private BASE_URL: string ) {super() }

  list():Promise<ICategory[]>{
    const promise = new Promise<ICategory[]>((resolve, reject)=>{
      this._http.get<ICategory[]>(this.BASE_URL + "categories")
      .toPromise()
      .then(response=>resolve(response), error => reject(error));
    });
    return promise;
  }

  getById(id:number):Promise<ICategory>{
    const promise = new Promise<ICategory>((resolve, reject)=>{
      this._http.get<ICategory>(this.BASE_URL + "categories/"+ id)
      .toPromise()
      .then(response=>resolve(response), error => reject(error));
    });
    return promise;
  }
}