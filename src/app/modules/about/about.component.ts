import { Component, Inject, Input, OnInit } from '@angular/core';
import { WriterService } from 'src/app/core/services/writer/writer.service';
import { Writer } from 'src/app/shared/components/subscribe/writer';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.less']
})
export class AboutComponent implements OnInit {

  @Input() writer: Writer;

  constructor(@Inject("COMPANY_ID") private COMPANY_ID: string, private _service_writer: WriterService) { }

  ngOnInit() {
    this._service_writer.getById(this.COMPANY_ID).then((result) => {
      this.writer = result.data;
    });
  }

}
