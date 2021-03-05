import { Component, OnInit, Input } from '@angular/core';
import { IArticle } from '../article/IArticle';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Component({
  selector: 'app-recent-post',
  templateUrl: './recent-post.component.html',
  styleUrls: ['./recent-post.component.less']
})
export class RecentPostComponent implements OnInit {
  @Input() articles: IArticle[];
  $moment:any = moment;
  constructor() { }

  ngOnInit() {
  }

}
