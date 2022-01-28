import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Helper } from '../../helpers/helper';
import { ICategory } from './ICategory';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.less']
})
export class CategoriesComponent implements OnInit {
  @Input() categories:ICategory[];
  constructor(private router:Router ) { }

  ngOnInit() {}
  
  routerLink = (route:string, params: object)=>{
    Helper.routerLink(this.router, route, params);
  };
}
