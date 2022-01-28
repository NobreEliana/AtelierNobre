import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { CommentService } from 'src/app/core/services/comment/comment.service';
import { Helper } from '../../helpers/helper';
import { Account } from '../../models/account';
import { CommentDTO } from '../../models/comment';
import { Comment } from '../../models/comment';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.less']
})
export class CommentsComponent implements OnInit {

  nameInitials: string;
  userLogged: Account;
  isLogged: boolean;
  articleId: string;
  userName: string;
  smallUser: boolean = false;
  previewOn: boolean = false;
  icone: string = "right";
  addPadding: boolean = false;
  noComments: boolean;
  commentList: CommentDTO[];
  replyList: CommentDTO[];
  userComment: CommentDTO;


  constructor(private commentService: CommentService, private route: ActivatedRoute, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.articleId = this.route.snapshot.params.article;
    this.getListComment();
  }

  getListComment() {
    let comment = new Comment();
    comment.articleId = this.articleId;
    this.commentService.getSearch(comment).then(result => {
      this.commentList = result.data.filter((comment) => comment.parentId == null);

      result.data.map((comment) => {
        this.getChildrenList(comment, this.commentList, result.data);
      });

      if (this.commentList.length == 0)
        this.noComments = true;
      else {
        this.noComments = false;
      }
    });
  }

  getChildrenList(comment: CommentDTO, commentList: CommentDTO[], result: CommentDTO[]) {
    if (comment.parentId != null) {
      let i = commentList.findIndex(_ => _.commentId == comment.parentId);
      if (i > -1) {
        if (commentList[i].childrenList == undefined)
          commentList[i].childrenList = [];

        if (commentList[i].childrenList.find(_ => _.commentId == comment.commentId) == undefined)
          commentList[i].childrenList.push(comment);

        result.map((comment) => {
          this.getChildrenList(comment, commentList[i].childrenList, result);
        });
      }

    }
  }
}