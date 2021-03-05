// import { Injectable } from '@angular/core';
// import { Http, Headers, Response, RequestOptions } from '@angular/http';
// import { UserModel } from '../../model/user.model';
// import { DataTablesResponse } from '../../model/datatable.model';
// import { Observable, forkJoin } from 'rxjs';
// import { map, mergeMap } from 'rxjs/operators';
// import { HttpClient } from '@angular/common/http';
// import { FrequencyModel } from '../../model/frequency.model';
// import { PostModel } from '../../view/posts/posts.component';

// @Injectable()
// export class UserService {
//   http: Http;
//   headers: Headers;
//   user: UserModel;
//   //url: string = "https://jsonplaceholder.typicode.com/";
//   url: string = "http://localhost:3000/";

//   constructor(http: Http, private httpCliente: HttpClient) {
//     this.http = http;
//     this.headers = new Headers();
//     this.headers.append('Content-Type', 'application/json');
//   }

//   //Retorna usuário por Id
//   getUserById(userId): Observable<UserModel> {
//     return this.http.get(this.url + 'users/' + userId).pipe(map(res => res.json()));
//   }

//   //Salva usuário
//   create(users: UserModel, frequency: FrequencyModel): Observable<Response> {
//     return this.http.post(this.url + "users", JSON.stringify(users), { headers: this.headers })
//       .pipe(mergeMap(res => {
//         frequency.userId = res.json().id;
//         return this.http.post(this.url + "frequency", JSON.stringify(frequency), { headers: this.headers })
//           .pipe(map(res => res.json(), error => this.throwError(error)))
//       }
//       ));
//   }

//   //Deleta Usuario
//   delete(userId): Observable<Response> {
//     return this.http.delete(this.url + "users/" + userId).pipe(mergeMap(res => {
//       return this.http.delete(this.url + "frequency?userId=" + userId)
//         .pipe(map(res => res.json(), error => this.throwError(error)));
//     }));
//   }

//   //Retorna Post por Id usuario
//   getPosts(userId): Observable<PostModel[]> {
//     return this.http.get(this.url + 'posts?userId=' + userId)
//       .pipe(map(res => res.json(), error => this.throwError(error)));
//   }

//   //Retorna Post por Id 
//   getPostById(postId): Observable<PostModel> {
//     return this.http.get(this.url + 'posts/' + postId)
//       .pipe(map(res => res.json(), error => this.throwError(error)));
//   }

//   //Retorna Album por Id Usuário
//   getAlbums(userId): Observable<Response[]> {
//     return this.http.get(this.url + 'albums?_embed=photos&userId=' + userId)
//       .pipe(map(res => res.json(), error => this.throwError(error)));
//   }

//   //Retorna Album por Id
//   getAlbumById(albumId): Observable<Response> {
//     return this.http.get(this.url + 'albums?_embed=photos&id=' + albumId)
//       .pipe(map(res => res.json(), error => this.throwError(error)));
//   }

//   //Monta retorno da DataTable
//   grid(dataTablesParameters: any): Observable<DataTablesResponse> {
//     const datatable = new DataTablesResponse();
//     //Verifica qual página foi solicitada
//     let page = dataTablesParameters.start / dataTablesParameters.length + 1;

//     //Retorna os usuários com os posts, albums  e frequencias.
//     return forkJoin([this.http.get(this.url + 'users?_embed=posts&_embed=albums&_page=' + page + '&_limit=' + dataTablesParameters.length), this.http.get(this.url + 'photos'), this.http.get(this.url + "frequency"), this.http.get(this.url + 'users')]).pipe(map(results => {
//       let _users = results[0].json();
//       let _photos = results[1].json();
//       let _frequency = results[2].json();
//       let _qtd = results[3].json().length;

//       //Percorre usuários para pegar as fotos de cada album.
//       _users.map((item, index) => {
//         item.photos_count = 0;

//         //Percorre os albums para atribuir as fotos
//         $.map(item.albums, (_item, _index) => {
//           _item.photos = $.map(_photos, (_prop, _key) => { if (_prop.albumId == _item.id) return _prop });
//           _item.photos_count = _item.photos.length;
//           if (_item.userId == item.id) {
//             item.photos_count += _item.photos.length;
//             return _item;
//           }
//         });

//         //Retorna frequencia por usuario
//         let frequency = $.map(_frequency, (_item, _index) => { if (item.id == _item.userId) return _item })[0];

//         item.rideingroup = frequency.rideingroup;
//         item.daysofweek = frequency.daysofweek;
//         item.city = item.address.geo.lat != undefined ? "city:" + item.address.city : item.address.city;
//         item.posts_count = "posts:" + item.posts.length;
//         item.albums_count = item.albums.length;
//       });

//       //Verifica se o parametro de busca não está vazio e faz a busca
//       if (dataTablesParameters.search.value != "") {
//         datatable.data = $.map(_users, (prop, key) => {
//           for (const key in prop) {
//             if (typeof (prop[key]) !== "object") {
//               let value = prop[key] + "";
//               if (value.toLowerCase().includes(dataTablesParameters.search.value.toLowerCase())) return prop;
//             }
//           }
//         });
//       } else {
//         datatable.data = _users;
//       }

//       datatable.recordsFiltered = _qtd;
//       datatable.recordsTotal = datatable.data.length;
//       return datatable;
//     }, error => this.throwError(error)));
//   }

//   //Retorna mensagem de erro
//   private throwError(response) {
//     return Observable.throw(response.json().error || "Server error")
//   }
// }
