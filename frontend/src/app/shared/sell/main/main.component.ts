import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  errMsg:any = {};
  showSellerForm:FormGroup = new FormGroup ({
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
          this.data = res.userData.sellerId;
          // console.log(res)
          // console.log(this.data)
      },
      err => {
        console.log(err);
      },
      () => {}
    )
    let userData:any = this.data;
    this._auth.sellerPro(userData).subscribe(
      res => {
        // console.log(userData)
        console.log(res);
        this.showSellerForm.patchValue(res.sellerData);
        // if (res)
        // else this._router.navigateByUrl('/u');
      },
      err => {
        console.log(err)
      },
      () => {
      }
    )
  }


  showSeller() {

  }


  get fName () {
    return this.showSellerForm.get('fName');
  }
  get mName () {
    return this.showSellerForm.get('mName');
  }
  get lName () {
    return this.showSellerForm.get('lName');
  }
  get phone () {
    return this.showSellerForm.get('phone');
  }
  get country () {
    return this.showSellerForm.get('country');
  }
  get address () {
    return this.showSellerForm.get('address');
  }
  get business () {
    return this.showSellerForm.get('business');
  }

}
