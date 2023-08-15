import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {


  constructor(private http:HttpClient) { }

  public getOrderHistory(email:string){

   // return this.http.get(`http://localhost:8080/api/orders/search/findByCustomerEmail/${email}`)
    return this.http.get(`https://shoppingappbackend-production.up.railway.app/api/orders/search/findByCustomerEmail/${email}`)
  }
}
