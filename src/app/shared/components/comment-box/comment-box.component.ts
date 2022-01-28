import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from 'src/app/core/services/comment/comment.service';
import { Helper } from '../../helpers/helper';
import { Account } from '../../models/account';
import { CommentDTO } from '../../models/comment';

@Component({
  selector: 'app-comment-box',
  templateUrl: './comment-box.component.html',
  styleUrls: ['./comment-box.component.less']
})

export class CommentBoxComponent implements OnInit {
  userLogged:Account;
  isLogged:boolean;
  articleId:string;
  userName:string;
  smallUser:boolean=false; 
  previewOn:boolean=false;
  @Input() addPadding:boolean;
  @Input() commentId:string;
  
  commentList: CommentDTO[];
  userComment: CommentDTO;
  $moment = moment;
  commentForm = new FormGroup({
    comment: new FormControl('', Validators.required)
  });

  constructor(private commentService:CommentService, private route:ActivatedRoute, private router:Router,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.articleId=this.route.snapshot.params.article;
    this.userLogged = JSON.parse(sessionStorage.getItem('user-logged'));
    
  }

  createComment(){
    let comment= new CommentDTO();
    comment.articleId= this.articleId;
    comment.companyId= this.userLogged.companyId;
    comment.userId= this.userLogged.id;
    comment.user= this.userLogged.firstName + ' ' + this.userLogged.lastName;
    comment.content=this.commentForm.value.comment;
    comment.createDate = this.$moment(new Date()).format('LL');
    comment.parentId = this.commentId;
    return comment;
  }

  publishComment(){
    let comment= this.createComment();
    this.commentService.create(comment).then(result=>{
      if(result.resultCode==200){
        this.toastr.success(result.description);
        window.location.reload();
      }
      else{
        this.toastr.error(result.description);
      }
      this.clearForm();
    });
  }

  loginEmitter($event){
    this.isLogged= $event;
  }

  clearForm(){
    this.commentForm.patchValue({
      comment:''
    });
  }

  preview(){
    if(!this.previewOn){
      this.userComment= this.createComment();
      this.previewOn=true;
    }
  }

  closePreview(){
    this.previewOn=false;
  }

  getInitial(name:string){
    return Helper.namesTitle(name);
  }
}