import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
   templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:Product[]=[]
  currentCategoryId:any;
  searchMode:boolean=false;
  

  constructor(private productService:ProductService,private route: ActivatedRoute
    ,private cartService:CartService
    ){}

  ngOnInit(): void {
    this.route.params.subscribe(()=>{
      // this.currentCategoryId=params['id']
      this.listProducts();
    })
     
  }

  listProducts(){
    this.searchMode=this.route.snapshot.paramMap.has('keyword')
    if(this.searchMode)
    {
      this.handleSearchProduct();
    }
    else{
   this.handleListProduct();
  }
}

  // productByCategory(){
  //   this.productService.getProductListByCategoryId(this.currentCategoryId).subscribe(
  //     (data:any)=>{
  //       this.products=data;
  //     },
  //     (error)=>{
  //       console.log(error);
  //     }
  //   )
  //   }

  handleSearchProduct()
  {
    const theKeyword:string=this.route.snapshot.paramMap.get('keyword')!;

    //serach for prod using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      (data:any)=>{
        this.products=data
      },
      (error)=>{
        console.log(error)
      }
    )
  }

  handleListProduct()
  {

     //check if "id" parameeter is available
     const hasCategoryId:boolean=this.route.snapshot.paramMap.has('id');

     if(hasCategoryId){
       //get the id and convert string to num using "+" symbol
       this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
     }
     else{
       //not category id avalable .. default to category 1
       this.currentCategoryId=1;
     }
     
     //now get the products for current ctegory id
     // this.productService.getProductList().subscribe(
     //   (data:any)=>{
     //     this.products=data;
     //   },
     //   (error)=>{
     //     console.log(error);
     //   }
     // )
     this.productService.getProductListByCategoryId(this.currentCategoryId).subscribe(
       (data:any)=>{
         this.products=data;
       },
       (error)=>{
         console.log(error);
       }
     )
  }
  addToCart(theProduct:Product)
  {
     // console.log(`Adding to Cart: ${theProduct.name},${theProduct.unitPrice}`);
      const theCartItem = new CartItem(theProduct)
      this.cartService.addToCart(theCartItem);
  }
}
