import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errMsg:any = {};
  constructor(private _auth:AuthService, private _router:Router) { }

  loginForm:FormGroup = new FormGroup ({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  ngOnInit(): void {
    // this._auth.seller = false;
  }

  handleLogin() {
    let userData:any = this.loginForm.value;
    this._auth.login(userData).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('Authorization', res.data.token);
        this._auth.isLoggedIn=true
        this._auth.userData= res.data
      },
      err => {
        if (err.error.message.includes('email')) this.errMsg.email = err.error.data.errors.email.message;
        if (err.error.message.includes('password')) this.errMsg.password = err.error.data.errors.password.message;
      },
      () => {
        this._router.navigateByUrl('/')
      }
    )
  }

  get email () {
    return this.loginForm.get('email');
  }
  get password () {
    return this.loginForm.get('password');
  }
}
