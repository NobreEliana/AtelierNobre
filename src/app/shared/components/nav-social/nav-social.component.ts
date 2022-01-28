import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account/account.service';
import { SocialMediaService } from 'src/app/core/services/social-media/socialmedia.service';
import { Account } from '../../models/account';
import { Article } from '../article/IArticle';

@Component({
  selector: 'app-navsocial',
  templateUrl: './nav-social.component.html',
  styleUrls: ['./nav-social.component.less']
})
export class NavSocialComponent implements OnInit {
  user: any = {};
  socialmedia: any[];
  show_menu: boolean = false;
  isLogged: boolean = false;
  smallUser: boolean = true;
  userLogged: Account;
  nameInitials: string;
  constructor(private _serv_socialmedia: SocialMediaService, private account: AccountService, private router: Router) { }

  ngOnInit() {
    this._serv_socialmedia.GetList().then(result => {
      this.socialmedia = result;
    });

    this.userLogged = JSON.parse(sessionStorage.getItem('user-logged'));
    this.changeUserBox();
  }

  dropDown() {
    this.show_menu = !this.show_menu;
  }

  changeUserBox() {

    if (this.userLogged == null) {
      this.isLogged = false;
    }
    else {
      this.isLogged = true;
      this.show_menu = false;
      this.getNameInitials();
    }
  }

  logout() {
    this.account.logout();
    sessionStorage.removeItem('user-logged');
    this.show_menu = false;
    this.isLogged = false;
  }

  getNameInitials() {
    let firstName = this.userLogged.firstName[0];
    let lastName = this.userLogged.lastName[0];
    this.nameInitials = firstName + lastName;
  }
}