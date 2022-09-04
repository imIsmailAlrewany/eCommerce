import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/providers/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errMsg:any = {};
  registerForm:FormGroup = new FormGroup ({
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })
  constructor(private _auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
    this._auth.seller = false;
  }

  handleRegister() {
    // if (this.registerForm.valid) console.log(this.registerForm.value);
    let userData:User = this.registerForm.value;
    this._auth.register(userData).subscribe(
      res => {
        console.log(res);
        localStorage.setItem('Authorization', res.token);
      },
      err => {
        if (err.error.message.includes('email')) this.errMsg.email = err.error.data.errors.email.message;
        if (err.error.message.includes('name')) this.errMsg.name = err.error.data.errors.name.message;
        if (err.error.message.includes('password')) this.errMsg.password = err.error.data.errors.password.message;
      },
      () => {
        this._router.navigateByUrl('/register/PP')
      }
    )
  }

  get name () {
    return this.registerForm.get('name');
  }
  get email () {
    return this.registerForm.get('email');
  }
  get password () {
    return this.registerForm.get('password');
  }

}
