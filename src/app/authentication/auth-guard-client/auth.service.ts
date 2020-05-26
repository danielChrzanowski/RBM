import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUserService } from 'src/app/models/logged-user/logged-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private loggedUserService: LoggedUserService) { }

  isLoggedIn() {
    if (sessionStorage.getItem('token') != null && this.loggedUserService.getCzy_pracownik() != true) {
      return true;
    } else {
      this.router.navigate(['/log-in']);
      return false;
    }
  }

}
