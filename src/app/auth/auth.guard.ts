import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class Premissionservices {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // console.log('Guard is being executed');
    // if (this.authService.isAuth()) {
    //   console.log('User is loged in', this.authService.isAuth());
    //   return true;
    // } else {
    //   console.log('redirecting to login');
    //   this.router.navigate(['/login']); // Redirect to login page if not logged in
    //   return false;
    // }
    return true;
  }
}

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(Premissionservices).canActivate(route, state);
};
