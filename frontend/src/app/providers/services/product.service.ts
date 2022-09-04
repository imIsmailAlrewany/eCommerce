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
  baseURL = 'http://localhost:3000/product';
  public userData = null;
  public isLoggedIn = false;
  constructor(private _http:HttpClient) { }

  addProduct(data:Product):Observable<any> {
    return this._http.post(`${this.baseURL}/add`, data);
  }
  editBanner(data:any, id:any):Observable<any> {
    return this._http.patch(`${this.baseURL}/B/:${id}`, data);
  }
  delBanner(id:any):Observable<any> {
    return this._http.delete(`${this.baseURL}/B/:${id}`);
  }
  editProduct(data:any, id:any):Observable<any> {
    return this._http.patch(`${this.baseURL}/P/:${id}`, data);
  }
  delProduct(id:any):Observable<any> {
    return this._http.delete(`${this.baseURL}/P/:${id}`);
  }
  addPhoto(data:any, id:any):Observable<any> {
    return this._http.patch(`${this.baseURL}/PP/:${id}`, data);
  }
  delPhoto(id:any, pName:any):Observable<any> {
    return this._http.delete(`${this.baseURL}/PP/:${id}/:${pName}`);
  }
  delAll():Observable<any> {
    return this._http.delete(`${this.baseURL}/delete`);
  }
  categories():Observable<any> {
    return this._http.get(`${this.baseURL}/`);
  }
}
