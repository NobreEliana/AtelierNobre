import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/core/services/account/account.service';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { WriterService } from 'src/app/core/services/writer/writer.service';
import { IPosition, Modal } from '../../models/modal';
import { Register } from '../../models/register';
import { LoginComponent } from '../login/login.component';
import { Writer } from '../subscribe/writer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  writer: Writer;
  registerUser: Register;
  overlay: boolean = true;
  redirectTo: boolean = true;
  nextToElement: string;
  position: IPosition;
  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    acceptTerms: new FormControl(false, Validators.requiredTrue)
  });

  constructor(@Inject("COMPANY_ID") private COMPANY_ID: string, private _service_writer: WriterService,
    private accountService: AccountService, private toastr: ToastrService, private modalService: ModalService,
    private router: Router) { }

  ngOnInit() {
    this._service_writer.getById(this.COMPANY_ID).then((result) => {
      this.writer = result.data;
    });
  }

  checkToggle() {
    this.registerForm.value.acceptTerms = !this.registerForm.value.acceptTerms;
  }

  getFormValue(registerUser: Register) {
    let registerForm = this.registerForm.value;
    registerUser.firstName = registerForm.firstName;
    registerUser.lastName = registerForm.lastName;
    registerUser.email = registerForm.email;
    registerUser.password = registerForm.password;
    registerUser.confirmPassword = registerForm.confirmPassword;
    registerUser.acceptTerms = registerForm.acceptTerms;
  }

  createAccount() {
    let new_register = new Register;
    this.getFormValue(new_register);
    new_register.title = "ms"
    new_register.companyId = this.writer.companyId;
    new_register.companyName = this.writer.companyName;
    new_register.theme = this.writer.theme.split('|')[1];

    this.accountService.register(new_register).then(result => {
      if (result.resultCode == 200) {
        localStorage.setItem(result.data.id, JSON.stringify(result.data));
        this.toastr.success(result.description + "Verifique seu email para ativar a sua conta!");
        this.modalService.remove();
        if (this.redirectTo) {
          this.router.navigate(["/"]).then(() => {
            window.location.reload();
          });
        }
      }
      this.clearForm();
    })
  }

  clearForm() {
    this.registerForm.patchValue({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false
    })
  }

  openLoginModal() {
    if (this.redirectTo)
      this.router.navigate(['/login']);
    else {
      this.modalService.remove();
      this.modalService.add(new Modal(LoginComponent, this.nextToElement, this.position, this.overlay, this.redirectTo));
    }
  }

  removeModal() {
    if (this.redirectTo) {
      this.modalService.remove();
      this.router.navigate(['/']);
    }
    else
      this.modalService.remove();
  }
}