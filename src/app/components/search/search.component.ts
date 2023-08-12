import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private router:Router){}

  dosearch(value:string)
  {
    console.log(`value=${value}`)
    this.router.navigateByUrl(`/search/${value}`)
  }

}
