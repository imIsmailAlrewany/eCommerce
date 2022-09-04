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
  baseURL = 'http://localhost:3000/cart';
  public userData = null;
  public isLoggedIn = false;
  constructor(private _http:HttpClient) { }

  add(data:Cart):Observable<any> {
    return this._http.post(`${this.baseURL}/add`, data);
  }
  showCart():Observable<any> {
    return this._http.get(`${this.baseURL}/`);
  }
  delCartProduct(id:any):Observable<any> {
    return this._http.delete(`${this.baseURL}/del/:${id}`);
  }
  addAndDelQuantity(data:any, id:any):Observable<any> {
    return this._http.post(`${this.baseURL}/Q/:${id}`, data);
  }
  order(data:any, id:any):Observable<any> {
    return this._http.post(`${this.baseURL}/order/:${id}`, data);
  }
  showOrders(id:any):Observable<any> {
    return this._http.get(`${this.baseURL}/order/:${id}`);
  }
  delOrder(id:any):Observable<any> {
    return this._http.delete(`${this.baseURL}/order/:${id}`);
  }
}
