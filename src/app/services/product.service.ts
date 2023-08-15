import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl='http://localhost:8080/products'

  constructor(private httpClient:HttpClient) { }

//   getProductList():Observable<Product[]>{
//     return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
//       map(response => response._embedded.products)
//     );
//   }
// }

// interface GetResponse{
//   _embedded:{
//     products:Product[]
//   }

public getProductList(){
 // return this.httpClient.get(`http://localhost:8080/api/getAllProducts`);
  return this.httpClient.get(`https://shoppingappbackend-production.up.railway.app/api/getAllProducts`);
}

public getProductListByCategoryId(id:number){
  //return this.httpClient.get(`http://localhost:8080/api/getByCategoryId/${id}`);
  return this.httpClient.get(`https://shoppingappbackend-production.up.railway.app/api/getByCategoryId/${id}`);
}

public categories()
{
  //return this.httpClient.get(`http://localhost:8080/api/getAllProductsCategory`);
  return this.httpClient.get(`https://shoppingappbackend-production.up.railway.app/api/getAllProductsCategory`);
}

public getProductCategories(id:number) {
//  return this.httpClient.get(`http://localhost:8080/api/getById/${id}`)
  return this.httpClient.get(`https://shoppingappbackend-production.up.railway.app/api/getById/${id}`)
}

public searchProducts(theKeyword:string)
{
 // return this.httpClient.get(`http://localhost:8080/api/search/findByNameContaining/${theKeyword}`)
  return this.httpClient.get(`https://shoppingappbackend-production.up.railway.app/api/search/findByNameContaining/${theKeyword}`)
}

public getProductById(theProductId:number)
{
  //return this.httpClient.get(`http://localhost:8080/api/getProductById/${theProductId}`)
  return this.httpClient.get(`https://shoppingappbackend-production.up.railway.app/api/getProductById/${theProductId}`)
}


}
