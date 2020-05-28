import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserSingleton } from 'src/app/models/user-singleton/user-singleton.service';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthGuardService {

  constructor(
    private router: Router,
    private loggedUserService: UserSingleton
  ) { }

  isLoggedIn() {
    if (sessionStorage.getItem('token') != null && this.loggedUserService.getCzy_pracownik() != true) {
      return true;
    } else {
      this.router.navigate(['/log-in']);
      return false;
    }
  }

}
