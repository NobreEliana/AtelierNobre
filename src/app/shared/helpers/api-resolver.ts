import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { ArticleService } from "src/app/core/services/articles/articles.services";
import { Article, IArticle } from "../components/article/IArticle";
import { IArchive } from "../components/blog-archive/IArchive";
import { Result } from '../models/result';

@Injectable({ providedIn: 'root' })
export class APIResolverArticle implements Resolve<Promise<any>> {
    constructor(private _serv_article: ArticleService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Result<IArticle[]>> | Promise<Result<IArticle>> {
        switch (route.data.article) {          
            case "list":
                return this._serv_article.GetList();
            case "search":
                let keys = Object.keys(route.queryParams);
                let article = new Article();
                keys.forEach((key) => { article[key] = route.queryParams[key]; });
                return this._serv_article.getBySearch(article);   
            default:
                return this._serv_article.GetList();
        }
    }
}
