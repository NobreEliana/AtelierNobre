import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { ArticleService } from "src/app/core/services/articles/articles.services";
import { CategoriasService } from "src/app/core/services/categorias/categorias.service";
import { WriterService } from 'src/app/core/services/writer/writer.service';
import { SocialMediaService } from 'src/app/core/services/social-media/socialmedia.service';
import { IArticle } from "../components/article/IArticle";
import { IArchive } from "../components/blog-archive/IArchive";
import { ICategory } from "../components/categories/ICategory";

@Injectable({ providedIn: 'root' })
export class APIResolverArticle implements Resolve<Promise<any>> {

    constructor(private _serv_article: ArticleService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<IArticle> | Promise<IArticle[]> | Promise<IArchive> {
        switch (route.data.article) {
            case "get":                
                return this._serv_article.getById(route.params.article);       
            case "list":
                return this._serv_article.listFull();
            case "search":
                return this._serv_article.getBySearch(route.params); 
            case "category":
                return this._serv_article.getByCategoriaId(route.params.categoryId);
            case "archive":
                return this._serv_article.getArchive();
           default:
                return this._serv_article.list();    
       }        
    }
}

@Injectable({ providedIn: 'root' })
export class APIResolverArchive implements Resolve<Promise<any>> {

    constructor(private _serv_article: ArticleService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<IArchive>  {
        switch (route.data.archive) {
            case "archive":
                return this._serv_article.getArchive();
           default:
                return null;    
       }        
    }
}

@Injectable({ providedIn: 'root' })
export class APIResolverCategories implements Resolve<Promise<any>> {

    constructor(private _serv_categories: CategoriasService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<ICategory> | Promise<ICategory[]> {
        switch (route.data.category) {
            case "get":
                return this._serv_categories.getById(route.params.id);       
            case "list":
                return this._serv_categories.list();     
           default:
            return this._serv_categories.list();  
       }        
    }
}
@Injectable({ providedIn: 'root' })
export class APIResolverWriter implements Resolve<Promise<any>> {

    constructor(private _serv_writer: WriterService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<Number[]> {
        switch (route.data.writer) {
            case "get":
                return this._serv_writer.get();
           default:
                return null;    
       }        
    }
}

@Injectable({ providedIn: 'root' })
export class APIResolverSocialM implements Resolve<Promise<any>> {

    constructor(private _serv_socialmedia: SocialMediaService){}
    
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<Number[]> {
        switch (route.data.socialmedia) {
            case "list":
               
                return this._serv_socialmedia.list();
           default:
                return null;    
       }        
    }
}