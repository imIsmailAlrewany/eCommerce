import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/services/auth.service';

@Component({
  selector: 'app-upp',
  templateUrl: './upp.component.html',
  styleUrls: ['./upp.component.css']
})
export class UppComponent implements OnInit {

  pic:any = '/assets/user.jpg';

  errMsg:any = {};
  uploadPicForm:FormGroup = new FormGroup ({
    pic: new FormControl()
  })
  constructor(public _auth:AuthService, private _router:Router) { }

  ngOnInit(): void {
    this._auth.seller = false;
  }

  onChangeImage (event:any) {
    this.pic = event.target.files[0];
    console.log(this.pic)
  }

  upPic() {
    // let userData:any = this.uploadPicForm.value;
    // this._auth.registerPic(userData).subscribe(
    //   res => {
    //     console.log(res);
    //   },
    //   err => {
    //     console.log(err)
    //   },
    //   () => {
    //     this._router.navigateByUrl('/login')
    //   }
    //   )

    let myData = new FormData();
    myData.append('userImage', this.pic, this.pic.name);
    this._auth.registerPic(myData).subscribe(
      res => console.log(res),
      err => console.log(err)
    )
  }
}
