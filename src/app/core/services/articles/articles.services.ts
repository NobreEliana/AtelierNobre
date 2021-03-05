import { BaseServices } from "../base.services";
import { Injectable, Inject } from "@angular/core";
import { catchError, map } from "rxjs/operators";
import { IArticle } from "src/app/shared/components/article/IArticle";
import { Observable, forkJoin } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ICategory } from "src/app/shared/components/categories/ICategory";
import { IArchive } from 'src/app/shared/components/blog-archive/IArchive';
import { promise } from "protractor";

@Injectable({
  providedIn: 'root'
})
export class ArticleService extends BaseServices{
    constructor(private _http: HttpClient, @Inject("BASE_URL") private BASE_URL: string ){super();}

    list():Promise<IArticle[]>{
        const promise = new Promise<IArticle[]>((resolve, reject)=>{            
            this._http.get<IArticle[]>(this.BASE_URL + 'articles')
            .toPromise()
            .then((response)=>{
                resolve(response);
            }, error => reject(error));
        });
        return promise;
    }

    getBySearch(search: any): Promise<IArticle[]> {
        let query="?";
        query+=search.year!==undefined?"year="+search.year+"&":"";
        query+=search.month!==undefined?"month="+search.month+"&":"";
        query+=search.title!==undefined?"title_like="+search.title+"&":"";
        query+=search.category!==undefined?"categoryId="+search.category+"&":"";

        const promise = new Promise<IArticle[]>((resolve, reject) =>{
            forkJoin([this._http.get<IArticle[]>(this.BASE_URL + 'articles' + query), this._http.get<ICategory[]>(this.BASE_URL + 'categories')])
            .toPromise()
            .then(result=>{
                let articles = result[0];
                let categorias= result[1];
    
                articles.map((item, index)=>{
                    item.data = new Date(item.year,item.month-1,item.day);
                    item.category = categorias.find(element => element.id == item.categoryId).name;
                })
    
                resolve(articles);
            }, error => reject(error));
        });

        return promise;
    }
      
    getById(id: number): Promise<IArticle> {
        const promise = new Promise<IArticle>((resolve, reject)=>{
            forkJoin([this._http.get<IArticle>(this.BASE_URL + 'articles?id=' + id), this._http.get<ICategory[]>(this.BASE_URL + 'categories')])
            .toPromise()
            .then(result => {
                let article = result[0][0];
                let categories = result[1];
    
                article.data = new Date(article.year, article.month - 1, article.day);
                article.category = categories.find(element => element.id == article.categoryId).name;
    
                resolve(article);
            }, error => reject(error));
        });
        return promise;
    }

    getByCategoriaId(categorieId: number): Promise<IArticle[]> {
        const promise = new Promise<IArticle[]>((resolve, reject)=>{
            this._http.get<IArticle[]>(this.BASE_URL + 'articles?categorieId=' + categorieId)
            .toPromise()
            .then((response)=>{
                resolve(response);
            }, error => reject(error));
        });
        return promise;
    }

    getArchive():Promise<IArchive>{
        const promise = new Promise<IArchive>((resolve, reject)=>{
            this._http.get<IArticle[]>(this.BASE_URL + 'articles')
            .toPromise()
            .then(result => {
                let _articles = result;
                
                let archive:IArchive;
                if(archive==undefined)
                        archive={years:[]};
    
                _articles.map((item) => {
                    if(archive.years.find(_=>_.year==item.year)==undefined){
                        archive.years.push({
                            months:[],
                            year:item.year
                        })
                    }
    
                    let crIndex= archive.years.findIndex(_=>_.year==item.year); 
    
                    if(archive.years[crIndex].months.find(_=>_.month==item.month)==undefined){
                        archive.years[crIndex].months.push({
                            title:[item.title],
                            month:item.month
                        })
                    }
                    else{
                        archive.years[crIndex].months.map((month,index)=>{
                            if(month.month==item.month){
                                month.title.push(item.title)
                            }
    
                        });
                    }     
                });    
                resolve(archive);    
            }, error => reject(error));
        });
        return promise;       
    }

    listFull():Promise<IArticle[]>{
        const promise = new Promise<IArticle[]>((resolve, reject)=>{
            forkJoin([this._http.get<IArticle[]>(this.BASE_URL + 'articles'), this._http.get<ICategory[]>(this.BASE_URL + 'categories')])
            .toPromise()
            .then(results => {
                let _articles = results[0];
                let _categories = results[1];
    
                _articles.map((item, index) => {
                    item.data = new Date(item.year, item.month - 1, item.day);
                    item.category = _categories.find(element => element.id == item.categoryId).name;
                });           
            
                resolve(_articles);
            }, error => reject(error));
        });
        return promise;
        
    }   
}