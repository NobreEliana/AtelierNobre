import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { Helper } from '../../helpers/helper';
import { Comment } from '../../models/comment';
import { Modal } from '../../models/modal';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.less']
})
export class CommentItemComponent implements OnInit {

  @Input() item:Comment;
  @Input() index:number;
  @Input() parentIndex:string;
  replyComment:string;
  $moment = moment;
  userLogged:Account;

  constructor(private modalService:ModalService) { }

  ngOnInit() {
    this.userLogged = JSON.parse(sessionStorage.getItem('user-logged'));
  }

  getInitial(name:string){
    return Helper.namesTitle(name);
  }

  openReplyBox(index:string){
    if (this.userLogged == null) {
      this.openLoginModal(index);
    }
    else{
      if(document.querySelector('.reply-box.active'))
      document.querySelector('.reply-box.active').classList.remove('active');
      
      document.querySelector('.reply-box-'+index).classList.add('active');

      //this.replyComment='replybox' + index;
      //[class.active]="replyComment == (parentIndex!=undefined? 'replybox' +  parentIndex +'-'+ index: 'replybox' + index)"
    }
  }

  openLoginModal(index:string) {
    this.modalService.remove();
    this.modalService.add(new Modal(LoginComponent,"div.button-box-" + index ,{top:"30px", left:"48%"}, false, false));

  }

  openRegisterModal(index:string) {
    this.modalService.remove();
    this.modalService.add(new Modal(RegisterComponent,"div.button-box-" + index ,{top:"30px", left:"48%"} ,false, false));
  }
}
