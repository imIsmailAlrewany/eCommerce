import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { Seller } from 'src/app/models/seller';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent implements OnInit {

  errMsg:any = {};
  sellerForm:FormGroup = new FormGroup ({
    fName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    mName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    lName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    phone: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    country: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    type: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    address: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    businessType: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
  });
  constructor(private _auth:AuthService, private _router:Router) { }

  data:any = {};

  ngOnInit(): void {
    this._auth.seller = true;
    this._auth.single().subscribe(
      res => {
          this.data = res.userData.seller;
          // console.log(res)
          // console.log(this.data)
      },
      err => {
        console.log(err);
      },
      () => {}
    )
  }

  includes:any = ['fName', 'mName', 'lName', 'phone', 'country', 'type', 'details', 'business'];

  handelSeller() {
    let userData:Seller = this.sellerForm.value;
    this._auth.sell(userData).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('Authorization', res.token);
      },
      err => {
        // if (err.error.message.includes('fName')) this.errMsg.fName = err.error.data.errors.fName.message;
        // if (err.error.message.includes('mName')) this.errMsg.mName = err.error.data.errors.mName.message;
        // if (err.error.message.includes('lName')) this.errMsg.lName = err.error.data.errors.lName.message;
        // if (err.error.message.includes('phone')) this.errMsg.phone = err.error.data.errors.phone.message;
        // if (err.error.message.includes('country')) this.errMsg.country = err.error.data.errors.country.message;
        // if (err.error.message.includes('type')) this.errMsg.type = err.error.data.errors.type.message;
        // if (err.error.message.includes('details')) this.errMsg.details = err.error.data.errors.details.message;
        // if (err.error.message.includes('business')) this.errMsg.business = err.error.data.errors.business.message;
        console.log(err)
      },
      () => {
        this._router.navigateByUrl('/sell')
      }
    )
  }


  get fName () {
    return this.sellerForm.get('fName');
  }
  get mName () {
    return this.sellerForm.get('mName');
  }
  get lName () {
    return this.sellerForm.get('lName');
  }
  get phone () {
    return this.sellerForm.get('phone');
  }
  get country () {
    return this.sellerForm.get('country');
  }
  get address () {
    return this.sellerForm.get('address');
  }
  get business () {
    return this.sellerForm.get('business');
  }
}
