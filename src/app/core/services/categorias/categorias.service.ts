import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICategory } from 'src/app/shared/components/categories/ICategory';
import { Result } from 'src/app/shared/models/result';
import { Article, IArticle } from 'src/app/shared/components/article/IArticle';
import { Helper } from 'src/app/shared/helpers/helper';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private _http: HttpClient, @Inject("BASE_URL_ARTICLE") private BASE_URL_ARTICLE: string ) {}

  GetList():Promise<ICategory[]>{
    let article = new Article();
    article.articleStatus="published";

      const promise = new Promise<ICategory[]>((resolve, reject)=>{
      this._http.get<Result<IArticle[]>>(this.BASE_URL_ARTICLE + '/Article/GetSearch' + Helper.getQuery(article))
      .toPromise()
      .then(response=>{
        let articles = response.data;
        let categories:ICategory[] = [];

        articles.map((artigo)=>{
          if (categories.length == 0) {
            categories.push({id: categories.length, name: artigo.category});            
          }else if (!categories.find(_=>_.name==artigo.category)) {
            categories.push({id: categories.length, name: artigo.category});
          }
        });
        
        resolve(categories)
      }, error => reject(error));
    });
    return promise;
  }

  getById(id:number):Promise<ICategory>{
    const promise = new Promise<ICategory>((resolve, reject)=>{
      this._http.get<ICategory>(this.BASE_URL_ARTICLE + "categories/"+ id)
      .toPromise()
      .then(response=>resolve(response), error => reject(error));
    });
    return promise;
  }
}