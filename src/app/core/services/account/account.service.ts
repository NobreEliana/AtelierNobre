import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Account, LoginDTO } from 'src/app/shared/models/account';
import { Register } from 'src/app/shared/models/register';
import { Result } from 'src/app/shared/models/result';
import { VerifyEmail } from 'src/app/shared/models/verify-email';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  isSignedIn: boolean;
  currentUser:Account;
  constructor(@Inject("BASE_URL_IDENTITY") private BASE_URL_IDENTITY:string, private http:HttpClient, private cookies: CookieService) {}
  
  async authenticate(login: LoginDTO): Promise<Result<Account>> {
    const promise = new Promise<Result<Account>>((resolve) => {
      this.http.post<Result<Account>>(this.BASE_URL_IDENTITY + "/Identity/authenticate", login)
        .toPromise().then((response) => {
          if (response.resultCode == 200) {
            //Salvar login no cookies
            this.cookies.set("ena-token", response.data.jwtToken);
            this.cookies.set("ena-userid", response.data.id);
            this.cookies.set("ena-refreshToken", response.data.refreshJwtToken);
            this.cookies.set("ena-user", JSON.stringify(response.data));
            this.currentUser = response.data;
            this.isSignedIn = true;
          }
          return resolve(response);
        });
    });
    return promise;
  }

  async refreshToken(): Promise<Result<Account>> {
    const promise = new Promise<Result<Account>>((resolve) => {
      this.http.post<Result<Account>>(this.BASE_URL_IDENTITY + "/Identity/refresh-token", "", {
        headers: new HttpHeaders({ 'RefreshJwtToken': this.cookies.get("ena-refreshToken")})
      }).toPromise().then((response) => {
          if (response.resultCode == 200) {
            //Salvar login no cookies
            this.cookies.set("ena-token", response.data.jwtToken);
            this.cookies.set("ena-userid", response.data.id);
            this.cookies.set("ena-refreshToken", response.data.refreshJwtToken);
            this.cookies.set("ena-user", JSON.stringify(response.data));
            this.currentUser = response.data;
            this.isSignedIn = true;
            window.location.reload();
            return resolve(response);
          }

          if (response.resultCode == 500 && response.description.includes("Invalid token")){
            this.logout().then(_=>{
              window.location.reload();
            });
          }
        });
    });
    return promise;
  }

  async register(register: Register): Promise<Result<Account>> {
    const promise = new Promise<Result<Account>>((resolve) => {
      this.http.post<Result<Account>>(this.BASE_URL_IDENTITY + "/Identity/register", register)
        .toPromise().then((response) => {         
          return resolve(response);
        });
    });
    return promise;
  }


  async logout(): Promise<any> {
    const promise = new Promise<void>((resolve, reject) => {
      this.cookies.delete("ena-token");
      this.cookies.delete("ena-userid");
      this.cookies.delete("ena-refreshToken");
      this.cookies.delete("ena-user");
      this.currentUser = null;
      this.isSignedIn = false;
      resolve();
    });
    return promise;
  }

  

  async verifyEmailAccount(verifyEmail: VerifyEmail): Promise<Result<Account>> {
    const promise = new Promise<Result<Account>>((resolve) => {
      this.http.post<Result<Account>>(this.BASE_URL_IDENTITY + "/Identity/verify-email", verifyEmail)
        .toPromise().then((response) => {         
          return resolve(response);
        });
    });
    return promise;
  }

  async getAccountById(id:string): Promise<Result<Account>> {
    const promise = new Promise<Result<Account>>((resolve) => {
      this.http.get<Result<Account>>(this.BASE_URL_IDENTITY + "/Identity/get-userbyId/"+ id, {
        headers: new HttpHeaders({ 'CompanyId': this.cookies.get("companyId")})
      })
        .toPromise().then((response) => {         
          return resolve(response);
        });
    });
    return promise;
  }
  
  
}
