import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/core/services/articles/articles.services';
import { IArticle } from 'src/app/shared/components/article/IArticle';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.less']
})
export class BlogComponent implements OnInit {
  articles:IArticle[];
  settings:any;

  @ViewChild('overlay',{static: false}) overlayElement: ElementRef;
  @ViewChild('sidebarScroll',{static:false}) sideScrollElement:ElementRef;
  @ViewChild('btnSidebar',{static:false}) btnSidebarElement:ElementRef;

  active:boolean= false;
  fixed:boolean= false;
  sideScrollPosition:number;
  resultado:number;
  swipe_action = {
    left:'swipeleft',
    right:'swiperight'
  };

  constructor( private route: ActivatedRoute, private _serv_article:ArticleService) { }

  ngOnInit() {    
    if(window.innerWidth<768){
      this.settings = {
        layout: "full",
        listagem:true
      }
    }    
    else{
      this.settings = {
        layout: "list",
        listagem:true
      }
    }
    
    this.route.data.subscribe(result=>{
      //window.scroll(0,240);
      this.articles=result.article.data;
    });
  }

  @HostListener('window:resize')
      handleResize(){
        if(window.innerWidth<768){
          this.settings = {
            layout: "full",
            listagem:true
          }    
        }

    }
    @HostListener('window:scroll')
      handleScroll(){
        this.sideScrollPosition= this.sideScrollElement.nativeElement.offsetHeight;
        const windowScroll = window.pageYOffset;
        this.resultado= this.sideScrollPosition*(100-(window.innerHeight*100/this.sideScrollPosition))/100;
        
        if(windowScroll >= this.resultado){
            this.fixed = true;
        } else {          
          this.fixed = false;
        }
    }

 overlayCollapse(){
  if(this.active==false){
    this.active=true;
  }
  else{
    this.active=false;
  }
}

swipe(action: string){
  if(action === this.swipe_action.right){
    this.btnSidebarElement.nativeElement.click()
  }

  if(action === this.swipe_action.left){
    this.btnSidebarElement.nativeElement.click()
  }
}


}
