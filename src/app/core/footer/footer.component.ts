import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Instagram, InstaMedia } from 'src/app/shared/models/instagram';
import { InstagramService } from '../services/instagram/instagram.service';
import { SocialMediaService } from '../services/social-media/socialmedia.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
  @Input() socialmedia: any[];
  instaMedia:InstaMedia[];
  addNumber:boolean=true;
  
  constructor(private _serv_socialmedia: SocialMediaService, private instaService: InstagramService) { }

  ngOnInit() {
    this._serv_socialmedia.GetList().then(result => {
      this.socialmedia = result;
    });
    this.getInstaMedia();
  }

  getInstaMedia(){
    let insta = new Instagram();
    insta.qtdMedia=5;
    insta.companyName="Atelier Nobre";
    this.instaService.getInstagramMedia(insta).then(response=>{
      this.instaMedia= response.data;
    });
  }

}
