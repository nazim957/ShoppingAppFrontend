import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLockedIn=false;
  user=null;

  constructor(public loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    this.isLockedIn=this.loginService.isLockedIn();
    this.user=this.loginService.getUser();
    this.loginService.loginStatusSubject.asObservable().subscribe(data=>{
      this.isLockedIn=this.loginService.isLockedIn();
    this.user=this.loginService.getUser();
    })

  }

    public logout()
    {
      this.loginService.logout();
       window.location.reload();
      //this.router.navigateByUrl("/products")
     // this.login.loginStatusSubject.next(false);
    }
  

}