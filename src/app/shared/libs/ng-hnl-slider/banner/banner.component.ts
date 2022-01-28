import { Component, OnInit, Input, Output } from '@angular/core';
import * as moment from 'moment';
import { IBanner } from './IBanner';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.less']
})
export class BannerComponent implements OnInit {
  $moment=moment;
  @Input() banner: IBanner;
  @Input() show_body: boolean;
  @Input() show_img: boolean;
  
  constructor() { }

  ngOnInit() {
    
  }
}
