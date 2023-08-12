import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ShoppyValidators } from 'src/app/validators/shoppy-validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  loginFormGroup!: FormGroup;
  loginData={
    username:'',
    password:'',
  };

  constructor(private loginService:LoginService,private formBuilder: FormBuilder,private router:Router)
  {}
  ngOnInit(): void {

    this.loginFormGroup = this.formBuilder.group({
      login: this.formBuilder.group({
        //emailAddress: new FormControl('', [Validators.required, Validators.minLength(2),ShoppyValidators.notOnlyWhitespace]),
        password: new FormControl('', [Validators.required, Validators.minLength(2),ShoppyValidators.notOnlyWhitespace]),
        email: new FormControl('',
         [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),ShoppyValidators.notOnlyWhitespace])
      }),
  })
}
 onSubmit(){
  console.log('Handling submit button');
  // console.log("checking:" + this.loginFormGroup.get('login')?.value.email);
  // console.log("checking:" + this.loginFormGroup.get('login')?.value.password);
  //console.log(this.loginFormGroup)
  this.loginData.username=this.loginFormGroup.get('login')?.value.email
  this.loginData.password= this.loginFormGroup.get('login')?.value.password
  console.log("Login Data", this.loginData);
  
  this.loginService.generateToken(this.loginData).subscribe(
    (data:any)=>{
      console.log("LOGINCOmponent", data);

       //login
       this.loginService.loginUser(data.token)
       this.loginService.getCurrentUser().subscribe(
         (user:any)=>{
          this.loginService.setUser(user)
          this.loginService.loginStatusSubject.next(true);
           
         //  console.log(user)
         this.router.navigateByUrl('/products')
 
    })
  },
    (error:any)=>{
      console.log(error);
      
    }
  )
 }
}
