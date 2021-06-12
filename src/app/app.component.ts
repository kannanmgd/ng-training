import { Component, OnInit } from '@angular/core';
import { PaginationInstance } from 'ngx-pagination/dist/ngx-pagination.module';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  openSidenav = false;

  constructor(private _authService: AuthService,) { }

  ngOnInit() {
    this._authService.initAuthListner();
  }
  
}
