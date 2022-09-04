import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { Seller } from 'src/app/models/seller';
import { Product } from 'src/app/models/product';
import { Cart } from 'src/app/models/cart';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  addProduct(userData: Product) {
    throw new Error('Method not implemented.');
  }
  baseURL = 'http://localhost:3000/user';
  public seller = false;
  public userData = null;
  public isLoggedIn = false;
  constructor(private _http:HttpClient) { }

  register(data:User):Observable<any> {
    return this._http.post(`${this.baseURL}/register`, data);
  }
  registerPic(data:any):Observable<any> {
    return this._http.post(`${this.baseURL}/register/PP`, data);
  }
  login(data:any):Observable<any> {
    return this._http.post(`${this.baseURL}/login`, data);
  }
  single():Observable<any> {
    return this._http.get(`${this.baseURL}/u`);
  }
  editSingle(data:any):Observable<any> {
    return this._http.patch(`${this.baseURL}/u`, data);
  }
  deleteSingle():Observable<any> {
    return this._http.delete(`${this.baseURL}/u`);
  }
  deletePic(data:any):Observable<any> {
    return this._http.delete(`${this.baseURL}/single/pic`);
  }
  editPic(data:any):Observable<any> {
    return this._http.patch(`${this.baseURL}/single/pic`, data);
  }
  logout(data:any):Observable<any> {
    return this._http.post(`${this.baseURL}/logout`, data);
  }
  sell(data:Seller):Observable<any> {
    return this._http.post(`${this.baseURL}/sell`, data);
  }
  delSell():Observable<any> {
    return this._http.delete(`${this.baseURL}/sell`);
  }
  editSell(data:any):Observable<any> {
    return this._http.patch(`${this.baseURL}/sell`, data);
  }
  sellerPro(data:any):Observable<any> {
    return this._http.get(`${this.baseURL}/sell/u`, data);
  }
  sellerProduct():Observable<any> {
    return this._http.get(`${this.baseURL}/sell/products`);
  }
  sellerOrders():Observable<any> {
    return this._http.get(`${this.baseURL}/sell/orders`);
  }
  delProduct(id:string):Observable<any> {
    return this._http.delete(`${this.baseURL}/sell/products/${id}`);
  }

  productURL = 'http://localhost:3000/product';

  addSellProduct(data:Product):Observable<any> {
    return this._http.post(`${this.productURL}/add`, data);
  }
  editBanner(data:any, id:any):Observable<any> {
    return this._http.patch(`${this.productURL}/B/:${id}`, data);
  }
  delBanner(id:any):Observable<any> {
    return this._http.delete(`${this.productURL}/B/:${id}`);
  }
  editProduct(data:any):Observable<any> {
    return this._http.patch(`${this.productURL}/P/:id`, data);
  }
  delSellProduct(id:any):Observable<any> {
    return this._http.delete(`${this.productURL}/P/:${id}`);
  }
  addPhoto(data:any, id:any):Observable<any> {
    return this._http.patch(`${this.productURL}/PP/:${id}`, data);
  }
  delPhoto(id:any, pName:any):Observable<any> {
    return this._http.delete(`${this.productURL}/PP/:${id}/:${pName}`);
  }
  delAll():Observable<any> {
    return this._http.delete(`${this.productURL}/delete`);
  }
  categories():Observable<any> {
    return this._http.get(`${this.productURL}/`);
  }


  cartURL = 'http://localhost:3000/cart';

  add(id:any):Observable<any> {
    // console.log(`${this.cartURL}/add/${id}`)
    return this._http.get(`${this.cartURL}/add/${id}`);
  }
  showCart():Observable<any> {
    return this._http.get(`${this.cartURL}/`);
  }
  delCartProduct(id:any):Observable<any> {
    return this._http.delete(`${this.cartURL}/del/:${id}`);
  }
  addAndDelQuantity(quant:any, id:any):Observable<any> {
    return this._http.get(`${this.cartURL}/Q/${id}/${quant}`);
  }
  order(id:any):Observable<any> {
    return this._http.get(`${this.cartURL}/order/${id}`);
  }
  showOrders():Observable<any> {
    return this._http.get(`${this.cartURL}/order`);
  }
  delOrder(id:any):Observable<any> {
    return this._http.delete(`${this.cartURL}/order/${id}`);
  }

}
