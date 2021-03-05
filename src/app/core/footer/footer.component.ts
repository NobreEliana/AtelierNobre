import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialMediaService } from '../services/social-media/socialmedia.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  @Input() socialmedia:any[];

  constructor(private _serv_socialmedia: SocialMediaService) { }
 
  ngOnInit() {
      this._serv_socialmedia.list().then(result=>{
      this.socialmedia=result;
    })
  }

}
