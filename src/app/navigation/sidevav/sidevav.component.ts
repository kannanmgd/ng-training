import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidevav-list',
  templateUrl: './sidevav.component.html',
  styleUrls: ['./sidevav.component.scss']
})
export class SidevavComponent implements OnInit, OnDestroy {

  @Output() closeSidenav = new EventEmitter<void>();
  isAuth = false;
  authSubscription: Subscription

  constructor(
    private _authService: AuthService
  ) { }

  ngOnInit(): void {
    this.authSubscription = this._authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    })
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogOut() {
    this.onClose();
    this._authService.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
