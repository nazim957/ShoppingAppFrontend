import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
import { LoginComponent } from './components/login/login.component';
import { authguardGuard } from './services/authguard.guard';
import { AdminGuard } from './services/admin.guard';


//import { authguardGuard } from './services/authguard.guard';

const routes: Routes = [
  {
    path:'login', 
    component:LoginComponent,
    pathMatch:'full'
  },
  {
    path:'order-history', 
    component:OrderHistoryComponent,
    canActivate: [authguardGuard], 
   
  },
  {
    path:'checkout', 
    component:CheckoutComponent
  },
  {
    path:'cart-details', 
    component:CartDetailsComponent
  },
  {
    path:'products/:id', 
    component:ProductDetailsComponent
  },
  {
    path:'search/:keyword', 
    component:ProductListComponent
  },
  {//when path matches it create new instane of comp
    path : 'category/:id',
    component:ProductListComponent
  },
  {
    path : 'category',
    component:ProductListComponent
  },
  {
    path:'products',
    component:ProductListComponent
  },
  {
    path:'',
    redirectTo:'/products',
    pathMatch:'full'
  },
  {//generic route
    path:'**',
    redirectTo:'/products',
    pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
