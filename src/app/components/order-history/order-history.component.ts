import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/common/order-history';
import { LoginService } from 'src/app/services/login.service';
import { OrderHistoryService } from 'src/app/services/order-history.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit{

  orderHistoryList:OrderHistory[]=[];
  //storage:Storage=sessionStorage

  constructor(private orderHistoryService:OrderHistoryService,private loginService:LoginService){}

  ngOnInit(): void {
    this.handleOrderHistory();
  }
  handleOrderHistory() {

    //read the user email from browser storage
     const email=this.loginService.getUser().email
     console.log("EMAIL",email);
     
    //retrieve data from the service
    this.orderHistoryService.getOrderHistory(email).subscribe(
      (data:any)=>{
        console.log("Email", email);
        console.log(data);
        
        this.orderHistoryList=data
      }
    )
  }

}
