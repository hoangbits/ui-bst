import { Injectable } from '@angular/core';
import {Router, CanActivate, CanActivateChild} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivateChild {

  constructor(private router: Router) { }

  canActivateChild() {
    if (localStorage.getItem('remember') && localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}