import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public _auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
    this.profile();
  }

  profile(){
    this._auth.single().subscribe(
      res => {
        // console.log(res)
        this._auth.userData = res.userData;
      },
      err => {
        this._auth.isLoggedIn = false;
        this._auth.userData = null;
        this._router.navigateByUrl('/login');
      },
      () => {
        this._auth.isLoggedIn = true;
        // console.log(this._auth.isLoggedIn)
      }
    )
  }

  logout() {
    let userData:any = localStorage.getItem('Authorization');
    this._auth.logout(userData).subscribe(
      res => {
        // console.log(res);
        localStorage.removeItem('Authorization');
        this._auth.isLoggedIn = false;
        this._auth.userData = null;
      },
      err => {console.log(err)},
      () => {
        this._router.navigateByUrl('/login');
      }
    )
  }
}
