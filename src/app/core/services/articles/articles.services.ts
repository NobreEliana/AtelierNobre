import { Injectable, Inject, Query } from "@angular/core";
import { Article, IArticle } from "src/app/shared/components/article/IArticle";
import { HttpClient } from "@angular/common/http";
import { IArchive } from 'src/app/shared/components/blog-archive/IArchive';
import { Result } from "src/app/shared/models/result";
import { Helper } from 'src/app/shared/helpers/helper';

@Injectable({
    providedIn: 'root'
})
export class ArticleService {

    constructor(@Inject("BASE_URL_ARTICLE") private BASE_URL_ARTICLE: string, private _http: HttpClient) { }

    GetList(): Promise<Result<IArticle[]>> {
        let article = new Article();
        article.articleStatus = "published";
        const promise = new Promise<Result<IArticle[]>>((resolve, reject) => {

            this._http.get<Result<IArticle[]>>(this.BASE_URL_ARTICLE + '/Article/GetSearch' + Helper.getQuery(article))
                .toPromise()
                .then((response) => {
                    response.data.map(article => {
                        article.summary = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ut blandit elit, id lacinia lectus. Cras pretium libero turpis, sed imperdiet ipsum mollis a. Vestibulum cursus tincidunt odio vitae tincidunt. Cras commodo ultrices fringilla. Aenean ac nibh bibendum, mattis ante quis, posuere nibh. Integer blandit nibh id diam consectetur, ac molestie ex condimentum"
                    })
                    return resolve(response);
                }, (error) => reject(error));
        });
        return promise;
    }

    getBySearch(article: Article): Promise<Result<IArticle[]>> {
        article.articleStatus = "published";
        const promise = new Promise<Result<IArticle[]>>((resolve, reject) => {
            this._http.get<Result<IArticle[]>>(this.BASE_URL_ARTICLE + '/Article/GetSearch' + Helper.getQuery(article))
                .toPromise()
                .then((response) => {
                    return resolve(response);
                }, (error) => resolve(error));
        });

        return promise;
    }

    getById(id: string): Promise<Result<IArticle>> {
        const promise = new Promise<Result<IArticle>>((resolve) => {
            this._http.get<Result<IArticle>>(this.BASE_URL_ARTICLE + '/Article/GetById/' + id)
                .toPromise()
                .then((response) => {
                    return resolve(response);
                }, error => resolve(error));
        });
        return promise;
    }

    getArchive(): Promise<Result<IArchive>> {
        let article = new Article();
        article.articleStatus = "published";
        const promise = new Promise<Result<IArchive>>((resolve) => {
            this._http.get<Result<IArticle[]>>(this.BASE_URL_ARTICLE + '/Article/GetSearch' + Helper.getQuery(article))
                .toPromise()
                .then((response) => {
                    let result = new Result<IArchive>();
                    result.resultCode = response.resultCode;
                    result.description = response.description;
                    result.isSuccess = response.isSuccess;

                    let archive: IArchive;
                    if (response.resultCode != 200 || response.data == null) {
                        result.data = archive;
                        return resolve(result);
                    }

                    let _articles = response.data;

                    if (archive == undefined)
                        archive = { years: [] };

                    _articles.map((item) => {
                        if (archive.years.find(_ => _.year == new Date(item.publishDate).getFullYear()) == undefined) {
                            archive.years.push({
                                months: [],
                                year: new Date(item.publishDate).getFullYear()
                            })
                        }

                        let crIndex = archive.years.findIndex(_ => _.year == new Date(item.publishDate).getFullYear());

                        if (archive.years[crIndex].months.find(_ => _.month == new Date(item.publishDate).getMonth() + 1) == undefined) {
                            archive.years[crIndex].months.push({
                                title: [item.title],
                                month: new Date(item.publishDate).getMonth() + 1
                            })
                        }
                        else {
                            archive.years[crIndex].months.map((month, index) => {
                                if (month.month == new Date(item.publishDate).getMonth() + 1) {
                                    month.title.push(item.title)
                                }

                            });
                        }
                    });
                    result.data = archive;
                    return resolve(result);
                }, error => resolve(error));
        });
        return promise;
    }
}