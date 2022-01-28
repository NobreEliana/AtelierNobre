import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Helper } from 'src/app/shared/helpers/helper';
import { Comment, CommentDTO } from 'src/app/shared/models/comment';
import { Result } from 'src/app/shared/models/result';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(@Inject("BASE_URL_ARTICLE") private BASE_URL_ARTICLE: string, private http: HttpClient) { }

  async create(comment: CommentDTO): Promise<Result<Comment>> {
    const promise = new Promise<Result<Comment>>((resolve) => {
      this.http.post<Result<Comment>>(this.BASE_URL_ARTICLE + "/Comment/Create", comment)
        .toPromise().then((response) => {
          return resolve(response);
        });
    });
    return promise;
  }

  async update(comment: Comment): Promise<Result<Comment>> {
    const promise = new Promise<Result<Comment>>((resolve) => {
      this.http.patch<Result<Comment>>(this.BASE_URL_ARTICLE + "/Comment/Update", comment)
        .toPromise().then((response) => {
          return resolve(response);
        });
    });
    return promise;
  }

  async getSearch(comment: Comment): Promise<Result<Comment[]>> {
    const promise = new Promise<Result<Comment[]>>((resolve) => {
      this.http.get<Result<Comment[]>>(this.BASE_URL_ARTICLE + "/Comment/GetSearch" + Helper.getQuery(comment))
        .toPromise().then((response) => {
          return resolve(response);
        });
    });
    return promise;
  }
}
