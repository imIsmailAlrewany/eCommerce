import { JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories:any = [];
  keys:any[] = [];
  key:any;
  id:any;

  constructor(private _auth:AuthService, private _router:Router, private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this._auth.categories().subscribe(
      res => {
        this.categories = {...res.data.categories};
        this.keys = res.data.gottenC;
        // for (const key in object) {
        //   const element = object[key];
        // }
        console.log(this.categories);
      },
      err => console.log(err),

      () => {

      }
    )
  }

  addToCart(id:any) {
    // this.id = JSON.stringify(params)
    // this._route.params.subscribe(params => this.id = params);
    // console.log()
    this._auth.add(id).subscribe(
      res => {
        console.log(res);
        this._router.navigateByUrl('/cart');
      },
      err => console.log(err),
      () => {}
    )
  }

}
