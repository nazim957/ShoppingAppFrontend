import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Purchase } from '../common/purchase';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }

  placeOrder(purchase:Purchase): Observable<any> {
    return this.http.post<Purchase>(`http://localhost:8080/api/checkout/purchase`,purchase)
  }


}
