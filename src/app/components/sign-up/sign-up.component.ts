import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { ShoppyValidators } from 'src/app/validators/shoppy-validators';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit{

  signUpFormGroup!: FormGroup;

  signUpData={
    username:'',
    password:'',
    firstName:'',
    lastName:'',
    email:'',
    phone:'',

  }

  constructor(private loginService:LoginService,private formBuilder: FormBuilder,private router:Router)
  {}

  ngOnInit(): void {

    this.signUpFormGroup = this.formBuilder.group({
      signUp: this.formBuilder.group({
        userName:new FormControl('',[Validators.required,Validators.minLength(4),ShoppyValidators.notOnlyWhitespace]),
        firstName:new FormControl('',[Validators.required,Validators.minLength(2),ShoppyValidators.notOnlyWhitespace]),
        lastName:new FormControl('',[Validators.required,Validators.minLength(2),ShoppyValidators.notOnlyWhitespace]),
        email: new FormControl('',
         [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),ShoppyValidators.notOnlyWhitespace]),
         phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]{10}'),ShoppyValidators.notOnlyWhitespace]),
         password: new FormControl('', [
          Validators.required,
          Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$'),
          ShoppyValidators.notOnlyWhitespace
        ]),
        
         confirmpassword: new FormControl('', [Validators.required,ShoppyValidators.notOnlyWhitespace]),
         termsAndConditions:new FormControl(false,Validators.required)
      }),
  })
}


get firstName()  { return this.signUpFormGroup.get('signUp.firstName')  }
get lastName()  { return this.signUpFormGroup.get('signUp.lastName')  }
get email()  { return this.signUpFormGroup.get('signUp.email')  }
get phone()  { return this.signUpFormGroup.get('signUp.phone')  }
get userName()  { return this.signUpFormGroup.get('signUp.userName')  }
get password()  { return this.signUpFormGroup.get('signUp.password')  }
get confirmpassword()  { return this.signUpFormGroup.get('signUp.confirmpassword')  }
get termsAndConditions()  { return this.signUpFormGroup.get('signUp.termsAndConditions')  }


onSubmit(){

  console.log("Handling SignUp ");
  

  if(this.signUpFormGroup.invalid){
    this.signUpFormGroup.markAllAsTouched();
    return;
  }

  this.signUpData.username=this.signUpFormGroup.get('signUp')?.value.userName
  this.signUpData.password=this.signUpFormGroup.get('signUp')?.value.password
  this.signUpData.firstName=this.signUpFormGroup.get('signUp')?.value.firstName
  this.signUpData.lastName=this.signUpFormGroup.get('signUp')?.value.lastName
  this.signUpData.email=this.signUpFormGroup.get('signUp')?.value.email
  this.signUpData.phone=this.signUpFormGroup.get('signUp')?.value.phone
 
  console.log("SignUpData",this.signUpData)
  console.log(this.signUpFormGroup.get('signUp')?.value.userName);
  

  this.loginService.register(this.signUpData).subscribe(
    (data)=>{
      console.log(data);
      alert("Registerd Successfully!!")
      this.router.navigateByUrl('/login')
    },
    (error)=>{
      console.log(error);
      alert("Error in Registering")
    }
  )

}

}
