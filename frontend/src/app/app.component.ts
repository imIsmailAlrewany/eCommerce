import { Component } from '@angular/core';
import { AuthService } from './providers/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_project';
  constructor(public _auth:AuthService){}
}
