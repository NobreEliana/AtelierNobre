import { Component, Input, OnInit } from '@angular/core';
import { IArticle } from '../article/IArticle';

@Component({
  selector: 'app-boxarticle',
  templateUrl: './box-article.component.html',
  styleUrls: ['./box-article.component.less']
})
export class BoxArticleComponent implements OnInit {
  @Input() article: IArticle; 
  @Input() settings:any;
  constructor() { }
  
  ngOnInit(){

  }

  
}
