import { Component, Input, OnInit } from '@angular/core';
import { SocialMediaService } from 'src/app/core/services/social-media/socialmedia.service';

@Component({
  selector: 'app-navsocial',
  templateUrl: './nav-social.component.html',
  styleUrls: ['./nav-social.component.less']
})
export class NavSocialComponent implements OnInit {
  user: any = {};
  @Input() socialmedia:any[];

  constructor(private _serv_socialmedia:SocialMediaService) { }

  ngOnInit() {
      this._serv_socialmedia.list().then(result=>{
      this.socialmedia= result;
    })
   }
}
