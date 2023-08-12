import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit{

  isAuthtnticated:boolean=false;
  userFullName:string=''
  user='';

  constructor(private loginService:LoginService)
  {}
  ngOnInit(): void {
    //subscribe to 
    this.isAuthtnticated=this.loginService.isLockedIn()
    this.user=this.loginService.getUser();
    // this.userFullName=this.user.username
  }
}
