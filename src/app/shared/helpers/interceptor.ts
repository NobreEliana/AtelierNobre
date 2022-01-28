import {  HttpErrorResponse, HttpEvent, HttpHandler,  HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/core/services/account/account.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class Interceptor implements HttpInterceptor {
    private refreshTokenInProgress = false;
    constructor(@Inject("COMPANY_ID") private COMPANY_ID: string, @Inject("BASE_URL_ARTICLE") private BASE_URL_ARTICLE:string,
    @Inject("BASE_URL_EMAIL") private BASE_URL_EMAIL:string, private toastr:ToastrService, private accountService:AccountService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const api_article_url = request.url.startsWith(this.BASE_URL_ARTICLE);
        const api_email_url = request.url.startsWith(this.BASE_URL_EMAIL);
        if (api_article_url || api_email_url) {
            request = request.clone({
                setHeaders: {
                    CompanyId: this.COMPANY_ID
                }
            });

        }
        return next.handle(request).pipe(catchError((HttpResponse:HttpErrorResponse) => {
            if (HttpResponse && HttpResponse.status === 500) {
                this.toastr.error("500 - Server Error. Ocorreu um erro no serviço. Por favor, tente novamente mais tarde!");
            }
            if (HttpResponse && HttpResponse.status === 401) {
                if(!this.refreshTokenInProgress){
                    this.refreshTokenInProgress = true;
                    this.toastr.error("401- Unauthorized. Sua sessão expirou! Revalidando sua sessão.");
                    this.accountService.refreshToken();
                }
            }
            if ( HttpResponse && HttpResponse.status === 400){
                this.toastr.error("400 - Bad Request. Há informações erradas na sua requisição. Por favor, validar as suas informações. ")
            }
            return throwError(HttpResponse);
        }));
    }    
}
