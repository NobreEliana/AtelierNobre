import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmailService } from 'src/app/core/services/email/email.service';
import { WriterService } from 'src/app/core/services/writer/writer.service';
import { Writer } from 'src/app/shared/components/subscribe/writer';
import { environment } from 'src/environments/environment';
import { Email } from './email';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.less']
})
export class ContactComponent implements OnInit {
  @Input() writer: Writer;

  emailForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    subject: new FormControl(''),
    message: new FormControl('')
  });

  constructor(@Inject("COMPANY_ID") private COMPANY_ID: string, private _service_writer: WriterService,
  private emailService:EmailService, private toastr: ToastrService) { }

  ngOnInit() {
    this._service_writer.getById(this.COMPANY_ID).then((result) => {
      this.writer = result.data;
    });
  }

  getFormValue(email:Email){
   let emailForm =this.emailForm.value;
   email.name = emailForm.name;
   email.from = emailForm.email;
   email.subject = emailForm.subject;
   email.message = emailForm.message;
  }

  sendEmail(){
    let new_email = new Email();
    this.getFormValue(new_email);
    new_email.to="contato@hnlcompany.com",
    new_email.type=0,
    new_email.companyName= this.writer.companyName,
    new_email.host = "http://ateliernobre.com.br",
    new_email.theme = "#fd717b",

    this.emailService.create(new_email).then(result=>{
      if(result.resultCode==200){
        this.toastr.success(result.description);
      }
      this.clearForm();
    })

  }

  clearForm(){
    this.emailForm.patchValue({
      name:"",
      email:"",
      subject:"",
      message:""
    })
  }

}
