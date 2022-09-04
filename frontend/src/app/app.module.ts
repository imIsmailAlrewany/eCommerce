import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './shared/about/about.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { LoginComponent } from './pages/user/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AuthInterceptor } from './providers/interceptor/auth.interceptor';
import { UppComponent } from './pages/user/upp/upp.component';
import { SellComponent } from './pages/sell/sell.component';
import { MainComponent } from './shared/sell/main/main.component';
import { UploadComponent } from './shared/sell/upload/upload.component';
import { ProductsComponent } from './shared/sell/products/products.component';
import { EditProductComponent } from './shared/sell/edit-product/edit-product.component';
import { CategoriesComponent } from './shared/categories/categories.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrdersComponent } from './shared/sell/orders/orders.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    ProfileComponent,
    UppComponent,
    SellComponent,
    MainComponent,
    UploadComponent,
    ProductsComponent,
    EditProductComponent,
    CategoriesComponent,
    CartComponent,
    OrdersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
    CarouselModule.forRoot()
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
