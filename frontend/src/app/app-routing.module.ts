import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SellComponent } from './pages/sell/sell.component';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { UppComponent } from './pages/user/upp/upp.component';
import { IsLoginGuard } from './providers/guard/is-login.guard';
import { CategoriesComponent } from './shared/categories/categories.component';
import { EditProductComponent } from './shared/sell/edit-product/edit-product.component';
import { MainComponent } from './shared/sell/main/main.component';
import { OrdersComponent } from './shared/sell/orders/orders.component';
import { ProductsComponent } from './shared/sell/products/products.component';
import { UploadComponent } from './shared/sell/upload/upload.component';

const routes: Routes = [
  {path:"cart", component:CartComponent, canActivate:[IsLoginGuard]},
  {path:"", component:HomeComponent},
  {path:"register", component:RegisterComponent},
  {path:"login", component:LoginComponent},
  {path:"u", component:ProfileComponent, canActivate:[IsLoginGuard]},
  {path:"register/PP", component:UppComponent},
  {path:"sell", component:SellComponent, canActivate:[IsLoginGuard]},
  {path:"sell/u", component:MainComponent, canActivate:[IsLoginGuard]},
  {path:"product/add", component:UploadComponent, canActivate:[IsLoginGuard]},
  {path:"product/add", component:UploadComponent, canActivate:[IsLoginGuard]},
  {path:"sell/products", component:ProductsComponent, canActivate:[IsLoginGuard]},
  {path:"product/P/:id", component:EditProductComponent, canActivate:[IsLoginGuard]},
  {path:"product/", component:CategoriesComponent},
  {path:"cart/add/:id", component:CartComponent, canActivate:[IsLoginGuard]},
  {path:"cart/Q/:id/:quant", component:CartComponent, canActivate:[IsLoginGuard]},
  {path:"cart/order/:id", component:CartComponent, canActivate:[IsLoginGuard]},
  {path:"cart/order/:id", component:CartComponent, canActivate:[IsLoginGuard]},
  {path:"cart/order/:id", component:CartComponent, canActivate:[IsLoginGuard]},
  {path:"cart/order", component:OrdersComponent, canActivate:[IsLoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
