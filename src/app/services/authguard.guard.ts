import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';
import { inject } from '@angular/core';

// const router=new Router();

export const authguardGuard: CanActivateFn = (route,state)=>{
  const token=localStorage.getItem('token');
  //const loginService=inject(LoginService)
 // const token = loginService.getToken();
  const router=inject(Router)
  console.log("Token from guard", token);
  

  if(token){
    return true
  }
  else{
    router.navigate(['login'])
    return false
  }
}

