import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  orders:any[] = [];
  cartProduct:any[] = [];
  product: any;
  quantForm:FormGroup = new FormGroup ({
    quant: new FormControl(),
  })

  constructor(private _auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
    this._auth.single().subscribe(
      res => {
        this.orders = res.userData.orders;
      },
      err => console.log(err),
      () => {this._router.navigateByUrl('/cart');}
    )

    this._auth.seller = false;

    // console.log(this._auth.userData)
    this._auth.showCart().subscribe(
      res => {
        console.log(res);
        this.cartProduct = res.cart;
      },
      err => {console.log(err)},
      () => {}
      )

      // console.log(this.cartProduct.cart)

      if (this._auth.userData)  {
        this.quantForm.patchValue(this.cartProduct);
      }
      else this._router.navigateByUrl('/cart');
    }

    inc(event:any, quantity:any) {
      this.product = this.cartProduct[event];
      this.cartProduct[event].quant = ++this.product.quant;
      this._auth.addAndDelQuantity(quantity, this.product._id).subscribe(
        res => console.log(res),
        err => console.log(err),
        () => {}
        )
      }

      dec(event:any, quantity:any) {
        this.product = this.cartProduct[event];
        this.cartProduct[event].quant = --this.product.quant;
        this._auth.addAndDelQuantity(quantity, this.product._id).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
            this.cartProduct[event].quant = ++this.product.quant;
            alert(err.error.message);
          },
          () => {}
          )
        }


        del(event:any) {
          this.product = this.cartProduct[event];
          this._auth.delOrder(this.product._id).subscribe(
            res => {
              console.log(res);
            },
            err => {
              console.log(err);
            },
      () => {this._router.navigateByUrl('/cart')}
      )
    }


    order(event:any) {
      this.product = this.cartProduct[event];
      this._auth.order(this.product._id).subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log(err);
        },
        () => {this._router.navigateByUrl('/')}
        )
      }

      delOrder(event:any) {
        // let id:any = this.orders.filter()
        this._auth.delOrder(event).subscribe(
          res => {
            console.log(res);
          },
          err => {
            console.log(err);
          },
          () => {
            this._router.navigateByUrl('/');
          }
        )
      }

    }
