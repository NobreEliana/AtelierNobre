import { Component, Input, OnInit } from '@angular/core';
import { NavigationExtras, Route, Router } from '@angular/router';
import * as moment from 'moment';
import { IArchive } from './IArchive';

@Component({
  selector: 'app-blog-archive',
  templateUrl: './blog-archive.component.html',
  styleUrls: ['./blog-archive.component.less']
})
export class BlogArchiveComponent implements OnInit {
  @Input() archives: IArchive;
  $moment:any = moment;
  search:any;
  constructor(private router:Router) { }

  ngOnInit() {

  }


}
