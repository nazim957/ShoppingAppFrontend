import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private loginService:LoginService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//add the jwt token request
let authReq = request
const token = this.loginService.getToken();
console.log("inside interceptor")
//console.log(token);

if(token!=null)
{
    authReq=authReq.clone({
      setHeaders:{Authorization :`Bearer ${token}` },
    })
}
return next.handle(authReq);
}

}

export const AuthInterceptorProviders=[
{
  provide:HTTP_INTERCEPTORS, //token
  useClass:AuthInterceptor,  //register the authinterceptorservice as a 
  multi: true,    //informs angular that HTTP_INTERCEPTORS is a token for injecting an array of values
},
]
