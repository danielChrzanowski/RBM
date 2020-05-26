import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUserService } from './models/logged-user/logged-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Paw';

  uzytkownik: LoggedUserService;

  constructor(private router: Router,
    private loggedUserService: LoggedUserService) {

    this.uzytkownik = loggedUserService.getLoggedUser();

    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('czy_pracownik');
    this.uzytkownik = null;

    this.refreshUser();

  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('czy_pracownik');
    this.uzytkownik = null;

    this.home();
  }

  refreshUser() {
    if (sessionStorage.length > 0) {
      this.uzytkownik = this.loggedUserService.getLoggedUser();
    }
  }

  home() {
    this.router.navigate(["/home"]);
  }

  logIn() {
    this.router.navigate(["/log-in"]);
  }

  showOrders() {
    this.router.navigate(["/showOrders"]);
  }

  createUser() {
    this.router.navigate(["/createUser"]);
  }

  menu() {
    this.router.navigate(["/menu"]);
  }

  clientOrders() {
    this.router.navigate(["/clientOrders"]);
  }

  clientMakeOrder() {
    this.router.navigate(["/makeOrder"]);
  }

}

/*
window.onload = function () {
  console.log("RELOADED");
}
*/
