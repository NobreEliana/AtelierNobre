import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/core/services/articles/articles.services';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { IArticle } from 'src/app/shared/components/article/IArticle';
import { LoginComponent } from 'src/app/shared/components/login/login.component';
import { RegisterComponent } from 'src/app/shared/components/register/register.component';
import { Account } from 'src/app/shared/models/account';
import { Modal } from 'src/app/shared/models/modal';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.less']
})
export class BlogArticleComponent implements OnInit {
  article:IArticle;
  list_articles:IArticle[];
  settings:any;
  userLogged:Account;
  isLogged:boolean;
  constructor( public _service_article:ArticleService, private route: ActivatedRoute, private modalService:ModalService) {}

  ngOnInit() {
    this.userLogged = JSON.parse(sessionStorage.getItem('user-logged'));
    this.verifyLogin();
    this.settings = {
      layout: "full",
      listagem:false
    }

    this._service_article.getById(this.route.snapshot.params.article).then((result)=>{
      this.article = result.data;
    });  
  }

  openRegisterModal() {
    this.modalService.remove();
    this.modalService.add(new Modal(RegisterComponent,"div.modal-account", {top:"0", left:"0"},false, false));
  }

  openLoginModal() {
    this.modalService.remove();
    this.modalService.add(new Modal(LoginComponent,"div.modal-account",{top:"0", left:"0"}, false, false));
  }

  verifyLogin(){
    if (this.userLogged == null) {
      this.isLogged = false;
    }
    else {
      this.isLogged = true;
    }
  }
}