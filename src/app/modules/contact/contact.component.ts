import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WriterService } from 'src/app/core/services/writer/writer.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {
@Input() writer:any;
  constructor(private _service_writer:WriterService) { }

  ngOnInit() {
    this._service_writer.get().then(data=>{
      this.writer= data;
    });
  }
}
