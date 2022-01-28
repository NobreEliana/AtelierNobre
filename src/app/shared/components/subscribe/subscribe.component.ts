import { Component, Input, OnInit } from '@angular/core';
import { Writer } from './writer';

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.less']
})
export class SubscribeComponent implements OnInit {
  @Input() writer:Writer;
  constructor() { }

  ngOnInit() {
  }

}
