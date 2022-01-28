import { Component, OnInit, Input } from '@angular/core';
import { IBanner } from '../banner/IBanner';

declare var $:any;

@Component({
  selector: 'hnlslider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less']
})
export class SliderComponent implements OnInit {
  @Input() qtd_slider: number;
  @Input() banners: IBanner[];
  @Input() responsive_layout: boolean;
  @Input() show_body: boolean;
  @Input() show_img: boolean;
  @Input() show_arrows: boolean;
  qtd_displayed: number; 
  style = {};
  constructor() { }

  ngOnInit() {
    let _this = this;
    _this.qtd_displayed  = _this.configLayout(_this.qtd_slider);
    _this.style = _this.configStyle(_this.qtd_displayed);

    window.addEventListener('resize', ()=>{
      _this.qtd_displayed  = _this.configLayout(_this.qtd_slider);
      _this.style = _this.configStyle(_this.qtd_displayed);
    });

    $('#carousel').init((e) =>{
      let qtd_item = $('.carousel-item').length;
      this.show_arrows = qtd_item == 1 ? false : true;

      if(qtd_item == 2){
        $('.carousel-item').each(item => {              
          let _item = $('.carousel-item').eq(item).clone();
          _item.removeClass('show active');
          _item.addClass('cloned');
          _item.appendTo('.carousel-inner');
        });
      }
    });

    $('#carousel').hover((e)=>{
      e.stopPropagation();
    })

    $('#carousel').on('slide.bs.carousel', (e) => {     
      let $item = $(e.relatedTarget);
      let idx = $item.index();
      let item = $('.carousel-item');
      let qtd_item = item.length;
      let parent = $('.carousel-inner');
      
      if (e.direction=="left") {
          parent.find('.show').removeClass('show').removeClass('last');
          if (idx > 1) {
            $('.carousel-item').eq(0).appendTo('.carousel-inner');
          }
          for(let x=1; x < _this.qtd_displayed; x++){
            item.eq(idx+x>=qtd_item?0:idx+x).addClass(x==_this.qtd_displayed-1?'show last':'show');
          }
         
        $('.carousel-item.show.last').css({'right':`-${100/_this.qtd_displayed}%`});
        if (_this.qtd_displayed == 1) $item.css({'right':'-100%', 'position': 'absolute', 'top': 0});
      }       
    });

    $('#carousel').on('slid.bs.carousel', (e) => {
      let $item = $(e.relatedTarget);
      let idx = $item.index();
      let item = $('.carousel-item');
      let parent = $('.carousel-inner');
      let qtd_item = item.length;
      
      if (e.direction=="right") {
        $('.carousel-item').eq(qtd_item-1).prependTo('.carousel-inner');         

        parent.find('.show').removeClass('show').removeClass('last');

        for(let x=1; x < _this.qtd_displayed; x++){
          item.eq(idx+x>=qtd_item?0:idx+x).addClass(x==_this.qtd_displayed-1?'show last':'show');
        }
      }

      $('.carousel-item.show.last').css('right', '');
      if (_this.qtd_displayed == 1) $item.css({'right':'', 'position': '', 'top': ''});

    });     
  }

  getAction(index){
    if(this.qtd_displayed == 1)
      return index == 0 ? 'active': '';
    else
      return index == 1 ? 'active' : (index > 0 && index <= this.qtd_displayed ? (index == this.qtd_displayed + 1 ? 'show last':'show') : '');
  }

  configLayout(qtd_displayed: number){
    if (this.responsive_layout) {
      if(screen.width <= 425 && qtd_displayed > 1){
        return 1;
      }else if(screen.width <= 768 && qtd_displayed > 3){
        return 3;
      }else if(screen.width <= 1024 && qtd_displayed > 4){
        return 4;
      }else{
        return qtd_displayed;
      }
    }
    return qtd_displayed;
  }

  configStyle(qtd_displayed: number){
    let qtd_item = $('.carousel-item').length;
    this.show_arrows = qtd_item == 1 ? false : true;

    return {'max-width.%': 100/qtd_displayed, 'min-width.%': 100/qtd_displayed };
  }
}
