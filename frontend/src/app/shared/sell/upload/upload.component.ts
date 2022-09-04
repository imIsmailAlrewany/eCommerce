import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  errMsg:any = {};
  uploadForm:FormGroup = new FormGroup ({
    category: new FormControl(),
    name: new FormControl(),
    description: new FormControl(),
    price: new FormControl(),
    quantity: new FormControl()
  });
  constructor(private _auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
    this._auth.seller = true;
  }


  handelProduct() {
    let userData:Product = this.uploadForm.value;
    this._auth.addSellProduct(userData).subscribe(
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
