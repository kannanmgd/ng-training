import { Route } from "@angular/compiler/src/core";
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanLoad, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { take } from "rxjs/operators";

import * as fromRoot from '../app.reducer';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private store: Store<fromRoot.State>
    ) {

    }
    canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): any {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }

    canLoad(_route: Route): any {
        return this.store.select(fromRoot.getIsAuth).pipe(take(1));
    }
}