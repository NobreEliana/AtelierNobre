import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { IArticle } from './IArticle';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.less']
})
export class ArticleComponent implements OnInit {
  @Input() article: IArticle;
  @Input() settings:any;
  $moment=moment;
  
  constructor() { 

    
  }
  
  ngOnInit(){
    
   
  }

  getLink(url:string):string{
    url = url.toLocaleLowerCase();
    url.replace(" ", "-");
    return url;
  }
}
