import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.less']
})
export class SubscribeComponent implements OnInit {
  @Input() writer:any;
  constructor() { }

  ngOnInit() {
  }

}
