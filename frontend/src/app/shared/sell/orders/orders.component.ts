import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders:any[] = [];
  cartProduct:any[] = [];
  product: any;
  constructor(private _auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
    this._auth.seller = true;

    this._auth.showOrders().subscribe(
      res => {
        console.log(res);
        this.orders = res.orders;
      },
      err => {
        console.log(err);
      },
      () =>{

      }
    )

  }

    delOrder(event:any) {
      console.log(event)
      this._auth.delOrder(event).subscribe(
        res => {
          console.log(res.order);
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
