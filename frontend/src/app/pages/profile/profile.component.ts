import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  pic:any = '' || 'assets/user.jpg';

  user: any = {};
  errMsg:any = {};
  disabled: boolean = true;
  editForm:FormGroup = new FormGroup ({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  constructor(private _auth:AuthService, private _router:Router) {
    this._auth.seller = false;
  }

  ngOnInit(): void {
    this._auth.seller = false;
    if (this._auth.userData)  {
      this.editForm.patchValue(this._auth.userData);
    }
    else this._router.navigateByUrl('/');
    // this._auth.single().subscribe(
    //   res => {
      //     this.user.userDataEmail = res.userData.email;
      //     this.user.userDataName = res.userData.name;
    //   },
    //   err => {
    //     console.log(err);
    //     this.disabled = false;
    //   },
    //   () => {}
    // )
  }

  handledit() {
    let userData:any = this.editForm.value;
    this._auth.editSingle(userData).subscribe(
      res => {console.log(res)},
      err => {
        if (err.error.message.includes('email')) this.errMsg.email = err.error.data.errors.email.message;
        if (err.error.message.includes('name')) this.errMsg.name = err.error.data.errors.name.message;
        if (err.error.message.includes('password')) this.errMsg.password = err.error.data.errors.password.message;
        console.log(err)
      },
      () => {
        this._router.navigateByUrl('/u')
      }
    )
  }

  // handledit() {
  //   let userData = this.editForm.value;
  //   console.log(userData)
  //   this._auth.editSingle(userData).subscribe(
  //     res => {

  //     },
  //     err => {
  //       console.log(err);
  //       console.log('error');
  //     },
  //     () => {

  //     }
  //   )
  // }

  edit() {
    this.disabled = false;
  }

  get name () {
    return this.editForm.get('name');
  }
  get email () {
    return this.editForm.get('email');
  }
  get password () {
    return this.editForm.get('password');
  }

  del() {
    this._auth.deleteSingle().subscribe(
      res => {
        console.log(res)
        localStorage.removeItem('Authorization');
      },
      err => console.log(err),
      () => {
        this._router.navigateByUrl('/register')
      }
    )
    }

}
