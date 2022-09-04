import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  id:any = '';
  filter:any = '';
  errMsg:any = {};
  editProductForm:FormGroup = new FormGroup ({
    category: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl()
  });
  constructor(private _auth:AuthService, private _router:Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._auth.seller = true;

    this._route.params.subscribe(params => this.id = params);


    // this._auth.sellerProduct().subscribe(
    //   res => {
    //     this.filter = res.products.find((_id: any) => res._id)
    //     // console.log(this.filter);
    //   },
    //   err => console.log(err),
    //   () => {}
    // )
    if (this._auth.userData)  {
      // this.editProductForm.patchValue(this.product);
    }
    else this._router.navigateByUrl('/sell/products');
  }



  editProduct() {
    let userData:any = this.editProductForm.value;
    this._auth.editProduct(userData).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
      },
      () => {
        this._router.navigateByUrl('/sell/products')
      }
    )
  }


}
