import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  categories:any;

  constructor(private cat:ProductService)
  {

  }

  ngOnInit(): void {
    this.cat.categories().subscribe(
      (data:any)=>{
        this.categories=data
      },
      (error)=>{
        console.log(error);
      }
    )
  }


}
