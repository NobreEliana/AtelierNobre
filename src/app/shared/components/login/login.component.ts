import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from 'protractor';
import { AccountService } from 'src/app/core/services/account/account.service';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { LoginDTO } from '../../models/account';
import { IPosition, Modal } from '../../models/modal';
import { RegisterComponent } from '../register/register.component';
import { Writer } from '../subscribe/writer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  writer:Writer;
  datalogin: LoginDTO;
  overlay:boolean=true;
  redirectTo:boolean=true;
  nextToElement:string;
  position:IPosition;
  loginForm= new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
 
  });
  constructor(private accountService:AccountService, private toastr:ToastrService, private router: Router,
    private modalService:ModalService, private route:ActivatedRoute) { }

  ngOnInit() {
  }

  login(login:LoginDTO){
    this.accountService.authenticate(LoginDTO.getLogin(login)).then((result) => {
      if(result.resultCode==200){
        sessionStorage.setItem('user-logged', JSON.stringify(result.data));
        this.toastr.success(result.description);
        this.modalService.remove();
        if(this.redirectTo){
          this.router.navigate(["/"]).then(()=>{
            window.location.reload();
          });
        }
        else{
          window.location.reload();
        }

       
      }
      else{
        this.toastr.error(result.description);
      }
    });
  }

  onSubmit() {
    this.datalogin = this.loginForm.value;
    this.login(this.datalogin);

  }

  openRegisterModal() {
    if(this.redirectTo)
    this.router.navigate(['/register']);
    else{
      this.modalService.remove();
      this.modalService.add(new Modal(RegisterComponent,this.nextToElement,this.position,this.overlay,this.redirectTo));
    }
  }

  removeModal(){
    if(this.redirectTo){
      this.modalService.remove();
      this.router.navigate(['/']);
    }
    else
      this.modalService.remove();
  }
}