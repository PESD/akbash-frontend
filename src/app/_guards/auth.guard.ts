import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from "@angular/router";
import { Observable } from "rxjs/Observable";

import { AuthService } from "../_services/auth.service";
import { LoginService } from "../_services/login.service";

import { Token } from "../_models/token";

import { AuthHelper } from "../_helpers/authhelper";

@Injectable()
export class AuthGuard implements CanActivate {
  token: Token;
  authHeaders: AuthHelper = new AuthHelper();

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) {
      this.loginService.getRefreshedToken().then(token => {
        this.authHeaders.setToken(token);
      });
      return true;
    }

    console.log("Requested a page  but not authorized");
    console.log(this.authService.isLoggedIn);

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(["/login"], { queryParams: { returnUrl: url } });
    return false;
  }
}
