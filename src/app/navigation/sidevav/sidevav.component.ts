import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../app.reducer'; 

@Component({
  selector: 'app-sidevav-list',
  templateUrl: './sidevav.component.html',
  styleUrls: ['./sidevav.component.scss']
})
export class SidevavComponent implements OnInit {

  @Output() closeSidenav = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription

  constructor(
    private _authService: AuthService,
    private store: Store<fromRoot.State>
  ) { }

  ngOnInit(): void {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogOut() {
    this.onClose();
    this._authService.logout();
  }

}
