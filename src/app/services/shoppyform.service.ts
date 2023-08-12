import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppyformService {

  constructor(private http:HttpClient) { }

  public getCountries(){
    return this.http.get(`http://localhost:8080/api/countries`);
  }

  public getStates(code:string){
    return this.http.get(`http://localhost:8080/api/states/search/findByCountryCode/${code}`);
  }

  //used observable bcz angualr comp can subscribe to this method and get async call results
  getCreditCardMonths(startMonth:number):Observable<number[]>{
    let data:number[]=[]
    //build an array for months
    //start at curret and loop untill
    for(let theMonth=startMonth;theMonth<=12;theMonth++)
    {
      data.push(theMonth);
    }
    return of(data);
  }

  getCreditCardYears():Observable<number[]>{
    let data:number[]=[]
    //build an array for years
    //start at curret and loop untill
    const startYear:number=new Date().getFullYear();
    const endYear:number=startYear+10;
    for(let theYear=startYear;theYear<=endYear;theYear++)
    {
      data.push(theYear);
    }
    return of(data);
  }


}
