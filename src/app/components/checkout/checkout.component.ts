import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Country } from 'src/app/common/country';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { Purchase } from 'src/app/common/purchase';
import { State } from 'src/app/common/state';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { LoginService } from 'src/app/services/login.service';
import { ShoppyformService } from 'src/app/services/shoppyform.service';
import { ShoppyValidators } from 'src/app/validators/shoppy-validators';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardYears: number[] = [];
  creditCardMonths: number[] = [];

  countries: Country[] = [];
  //states:State[]=[]

  shippingAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  storage:Storage=sessionStorage

  checkoutFormGroup!: FormGroup; //1 steps for formgroup

  constructor(
    private formBuilder: FormBuilder, private cartService:CartService,
    private checkoutService:CheckoutService,private router:Router,
    private loginService:LoginService,
    private shoppyService: ShoppyformService //2,
  
  ) {}
  ngOnInit(): void {

    this.reviewCartDetails();

    //read user email from browser storage
    const email=this.loginService.getUser().email
    console.log("USER EMAIL CHECK",email);
    

    //3
    this.checkoutFormGroup = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2),ShoppyValidators.notOnlyWhitespace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2),ShoppyValidators.notOnlyWhitespace]),
        email: new FormControl(email,
         [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),ShoppyValidators.notOnlyWhitespace])
      }),
      shippingAddress: this.formBuilder.group({
        // street: [''],
        // city: [''],
        // state: [''],
        // country: [''],
        // zipCode: [''],
        street: new FormControl('', [Validators.required, Validators.minLength(2),ShoppyValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2),ShoppyValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required, ]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2),ShoppyValidators.notOnlyWhitespace])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2),ShoppyValidators.notOnlyWhitespace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2),ShoppyValidators.notOnlyWhitespace]),
        state: new FormControl('', [Validators.required, ]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2),ShoppyValidators.notOnlyWhitespace])
      }),
      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required]),
        nameOnCard: new FormControl('', [Validators.required, Validators.minLength(2),ShoppyValidators.notOnlyWhitespace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}'),ShoppyValidators.notOnlyWhitespace]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}'),ShoppyValidators.notOnlyWhitespace]),
        expirationMonth: [''],
        expirationYear: [''],
      }),
    });

    //populate credit card months and years
    const startMonth: number = new Date().getMonth() + 1; //+1 bcz js is 0 based seee in service
    console.log('startMonth:' + startMonth);
    this.shoppyService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieve credit card months:' + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    this.shoppyService.getCreditCardYears().subscribe((data) => {
      console.log('Retrieve credit card years:' + JSON.stringify(data));
      this.creditCardYears = data;
    });

    //popuate country
    this.shoppyService.getCountries().subscribe((data: any) => {
      console.log('Retrieved countries: ' + JSON.stringify(data));
      this.countries = data;
    });
  }
  reviewCartDetails() {
    //subscribe to total quantity and total price

    this.cartService.totalQuantity.subscribe(
      totalQuantity=>this.totalQuantity=totalQuantity
    )

    this.cartService.totalPrice.subscribe(
      totalPrice=>this.totalPrice=totalPrice
    )
  }
  onSubmit() {
    //console.log('Handling submit button');
    // console.log("checking:" + this.checkoutFormGroup.get('creditCard')?.value.cardType);
    
    if(this.checkoutFormGroup.invalid){
      this.checkoutFormGroup.markAllAsTouched();
      return;
    }

    // console.log(this.checkoutFormGroup.get('customer')?.value);
    // console.log(
    //   'The shipping address country is' +
    //     this.checkoutFormGroup.get('shippingAddress')?.value.country.name
    // );
    // console.log(
    //   'The shipping address state is' +
    //     this.checkoutFormGroup.get('shippingAddress')?.value.state.name
    // );

      //set up order
      let order=new Order();
      order.totalPrice=this.totalPrice
      order.totalQuantity=this.totalQuantity;

      //get the cart items
      const cartItems=this.cartService.cartItems

      //create orderItems from cartItems
      let orderItems:OrderItem[]=[]
      for(let i=0;i<cartItems.length;i++){
        orderItems[i]=new OrderItem(cartItems[i])
      }


      //set up purchase
      let purchase = new Purchase();

      //populate purchase - customer
      purchase.customer=this.checkoutFormGroup.controls['customer'].value;

      //populate purchase - shipping and billing address
      purchase.shippingAddress=this.checkoutFormGroup.controls['shippingAddress'].value;
      const shippingState:State=JSON.parse(JSON.stringify(purchase.shippingAddress.state))
      const shippingCountry:Country=JSON.parse(JSON.stringify(purchase.shippingAddress.country))
      purchase.shippingAddress.state=shippingState.name
      purchase.shippingAddress.country=shippingCountry.name

      //billing
      purchase.billingAddress=this.checkoutFormGroup.controls['billingAddress'].value;
      const billingState:State=JSON.parse(JSON.stringify(purchase.billingAddress.state))
      const billingCountry:Country=JSON.parse(JSON.stringify(purchase.billingAddress.country))
      purchase.billingAddress.state=billingState.name
      purchase.billingAddress.country=billingCountry.name

      //populate purchase - order and order items
      purchase.order=order
      purchase.orderItems=orderItems

      //call REST API checkoutservice
      this.checkoutService.placeOrder(purchase).subscribe({
        next: response=>{
          alert(`Your order has been received. \n Order tracking number: ${response.orderTrackingNumber}`)
          this.resetCart();
        },
        error: err=>{
          alert(`There was an error: ${err.message}`)
        }
      }
      )

  }
  resetCart(){
    //reset cart and form data
    this.cartService.cartItems=[];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);

    this.checkoutFormGroup.reset()

    this.router.navigateByUrl("/products")

  }

  get firstName()  { return this.checkoutFormGroup.get('customer.firstName')  }
  get lastName()  { return this.checkoutFormGroup.get('customer.lastName')  }
  get email()  { return this.checkoutFormGroup.get('customer.email')  }

  get shippingAddressStreet()  { return this.checkoutFormGroup.get('shippingAddress.street')  }
  get shippingAddressCity()  { return this.checkoutFormGroup.get('shippingAddress.city')  }
  get shippingAddressState()  { return this.checkoutFormGroup.get('shippingAddress.state')  }
  get shippingAddressCountry()  { return this.checkoutFormGroup.get('shippingAddress.country')  }
  get shippingAddressZipCode()  { return this.checkoutFormGroup.get('shippingAddress.zipCode')  }

  get billingAddressStreet()  { return this.checkoutFormGroup.get('billingAddress.street')  }
  get billingAddressCity()  { return this.checkoutFormGroup.get('billingAddress.city')  }
  get billingAddressState()  { return this.checkoutFormGroup.get('billingAddress.state')  }
  get billingAddressCountry()  { return this.checkoutFormGroup.get('billingAddress.country')  }
  get billingAddressZipCode()  { return this.checkoutFormGroup.get('billingAddress.zipCode')  }

  get creditCardType()  { return this.checkoutFormGroup.get('creditCard.cardType')  }
  get creditNameOnCard()  { return this.checkoutFormGroup.get('creditCard.nameOnCard')  }
  get creditCardNumber()  { return this.checkoutFormGroup.get('creditCard.cardNumber')  }
  get creditCardSecurityCode()  { return this.checkoutFormGroup.get('creditCard.securityCode')  }

  copyShippingAddressToBillingAddress(event: any) {
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress'].setValue(
        this.checkoutFormGroup.controls['shippingAddress'].value
      );

      //fix for check states
      this.billingAddressStates = this.shippingAddressStates;
    } else {
      this.checkoutFormGroup.controls['billingAddress'].reset();

      //fix
      this.billingAddressStates = [];
    }
  }
  handleMonthsAndYears() {
    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');
    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(
      creditCardFormGroup?.value.expirationYear
    );

    //check currrnt year is equla to selected year
    let startMonth: number;
    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1; //+1 bcz to get the current month bcz js is 0 based
    } else {
      startMonth = 1;
    }
    this.shoppyService.getCreditCardMonths(startMonth).subscribe((data) => {
      console.log('Retrieve credit card Month' + JSON.stringify(data));
      this.creditCardMonths = data;
    });
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.name;

    console.log(`${formGroupName} country code: ${countryCode} `);
    console.log(`${formGroupName} country name: ${countryName} `);
    this.shoppyService.getStates(countryCode).subscribe((data: any) => {
      //console.log(JSON.stringify(data));
      if (formGroupName === 'shippingAddress') {
        this.shippingAddressStates = data;
      } else {
        this.billingAddressStates = data;
      }

      //select first item by default
      formGroup?.get('state')?.setValue(data[0]);
    });
  }
}
