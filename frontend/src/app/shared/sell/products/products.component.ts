import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  data: any = {};
  constructor(private _auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
    this._auth.seller = true;
    this._auth.sellerProduct().subscribe(
      res => {
        console.log(res);
        this.data = res;
      },
      err => console.log(err),
      () => {}
    )
  }

  del() {
    let id:any;
    this._auth.delSellProduct(id).subscribe(
      res => {
        console.log(res)
        localStorage.removeItem('Authorization');
      },
      err => console.log(err),
      () => {
        this._router.navigateByUrl('/sell/products')
      }
    )
  }
}
