import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/core/services/account/account.service';
import { VerifyEmail } from '../../models/verify-email';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.less']
})
export class VerifyEmailComponent implements OnInit {
 changeMessage:boolean=false;
 verifyEmail: VerifyEmail;
 redirectTimeout: number=3;

  constructor(private route: ActivatedRoute, private accountService:AccountService, private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
    //this.router.navigate(['verify-email'], {queryParams:{ token:this.token}})
    this.verifyEmailAccount();
  
  }

  verifyEmailAccount(){
    var accountId = this.route.snapshot.queryParams.user_key;
    var token = this.route.snapshot.queryParams.token;

    this.accountService.getAccountById(accountId).then(result=>{
      if(result.resultCode==200){

        if(!result.data.isVerified){

          this.verifyEmail = {
            "token": token,
            "companyId": result.data.companyId,
            "companyName": 'Atelier Nobre',
            "theme": "#ff8d8d",
            "email": result.data.email,
            "lastName": result.data.lastName,
            "firstName": result.data.firstName
          }

          this.accountService.verifyEmailAccount(this.verifyEmail).then(result=>{
          if(result.resultCode==200){
            this.changeMessage=true;
            setTimeout(_=>{
              this.router.navigate(['/'])
            },3000);
            setInterval(_=>{
              this.redirectTimeout--;
            },1000);
          }
          else{
            this.toastr.error(result.description);
          }
        });
      }
      else{
        this.changeMessage=true;
        setTimeout(_=>{
          this.router.navigate(['/'])
        },3000);
        setInterval(_=>{
          this.redirectTimeout--;
        },1000);
      }
      }
      else{
        this.toastr.error(result.description);
      }
    });
  }

}
