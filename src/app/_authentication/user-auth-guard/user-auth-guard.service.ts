import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserAuthGuardService {

  constructor(
    private router: Router
  ) { }

  isLoggedIn() {
    if (sessionStorage.getItem('token') != null) {
      return true;
    } else {
      this.router.navigate(['/log-in']);
      return false;
    }
  }
}
