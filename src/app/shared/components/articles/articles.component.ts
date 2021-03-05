import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { IArticle } from '../article/IArticle';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.less']
})
export class ArticlesComponent implements OnInit {
  @Input() articles: IArticle[];
  @Input() settings:any;
  constructor() { }
  
  ngOnInit() {
    
  }
  
  
}
