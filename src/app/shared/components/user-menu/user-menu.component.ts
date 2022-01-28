import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account/account.service';
import { Helper } from '../../helpers/helper';
import { Account } from '../../models/account';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.less']
})
export class UserMenuComponent implements OnInit {

  userName: string;
  user: any = {};
  userLogged: Account;
  show_menu: boolean = false;
  @Input() isLogged: boolean = false;
  @Input() smallUser: boolean;
  @Output() loginEmitter = new EventEmitter<boolean>();
  constructor(private account: AccountService, private router: Router) { }

  ngOnInit() {
    this.userLogged = JSON.parse(sessionStorage.getItem('user-logged'));
    if(this.userLogged!=null){
      this.userName= this.userLogged.firstName + " " + this.userLogged.lastName;
      this.changeUserBox();
    }
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
      this.getInitial(this.userName);
    }
    this.loginEmitter.emit(this.isLogged);
  }

  logout() {
    this.account.logout();
    sessionStorage.removeItem('user-logged');
    this.show_menu = false;
    this.isLogged = false;
    window.location.reload();
  }


  getInitial(name:string){
    return Helper.namesTitle(name);
  }
}