import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private _router: Router,
        private _authService: AuthService
    ) {

    }
    canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): any {
        if (this._authService.isAuth()) {
            return true;
        } else {
            this._router.navigate(['/login']);
        }
    }
}