import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navaccount',
  templateUrl: './nav-account.component.html',
  styleUrls: ['./nav-account.component.less']
})
export class NavAccountComponent implements OnInit {
  user: any = {};

  constructor() { }

  ngOnInit() { }
}
