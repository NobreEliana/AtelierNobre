import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { IArticle } from 'src/app/shared/components/article/IArticle';
import { ICategory } from 'src/app/shared/components/categories/ICategory';
import { IBanner } from 'src/app/shared/libs/ng-hnl-slider/banner/IBanner';
import { ActivatedRoute } from '@angular/router';
import { WriterService } from 'src/app/core/services/writer/writer.service';
import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { query } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  articles: IArticle[];  
  categories:ICategory[];
  banners:IBanner[]=[];
  @Input() sidebar:any;
  @Input() writer:any;
  archives:Number[]
  @Input() socialmedia:any;
  settings:any;
  
  @ViewChild('overlay',{static: false}) overlayElement: ElementRef;
  @ViewChild('sidebarScroll',{static:false}) sideScrollElement:ElementRef;
  @ViewChild('btnSidebar',{static:false}) btnSidebarElement:ElementRef;

  active:boolean= false;
  fixed:boolean= false;
  sideScrollPosition:number;
  resultado:number;
  qtd_slider = 5;
  swipe_action = {
    left:'swipeleft',
    right:'swiperight'
  };
  constructor(private _route: ActivatedRoute) { }
  
  ngOnInit(){

    this._route.data.subscribe(data=>{
      this.articles= data.articles;
      this.articles.forEach(element => {
          this.banners.push(
            {title: element.title, categorie: element.category, id: element.id, image:element.img , data:element.data, link: "/blog/" + element.id, btn:""})
    
      });

    })
   

    if(window.innerWidth<768){
      this.settings = {
        layout: "full",
        listagem:true
      }
    }    
    else{
      this.settings = {
        layout: "grid",
        listagem:true
      }
    }

  }

  @HostListener('window:resize', ['$event'])
      handleResize(){
        if(window.innerWidth<768){
          this.settings = {
            layout: "full",
            listagem:true
          }    
        }
    }

@HostListener('window:scroll', ['$event'])
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


