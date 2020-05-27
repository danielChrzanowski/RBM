import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoggedUserService } from './models/logged-user/logged-user.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Paw';

  uzytkownik: LoggedUserService;

  constructor(private router: Router,
    private loggedUserService: LoggedUserService,
    @Inject(DOCUMENT) private document: Document) {

    let theme = localStorage.getItem('theme');
    if (theme != null) {
      this.loadTheme(theme);
    }

    this.uzytkownik = loggedUserService.getLoggedUser();

    sessionStorage.removeItem('token');
    //sessionStorage.removeItem('userId');
    //sessionStorage.removeItem('czy_pracownik');
    this.uzytkownik = null;

    this.refreshUser();

  }

  loadTheme(cssFile: string) {
    const headEl = this.document.getElementsByTagName('head')[0];
    const newLinkEl = this.document.createElement('link');
    newLinkEl.rel = 'stylesheet';
    newLinkEl.href = cssFile;

    localStorage.setItem('theme', cssFile);
    headEl.appendChild(newLinkEl);
  }

  logout() {
    sessionStorage.removeItem('token');
    //sessionStorage.removeItem('userId');
    //sessionStorage.removeItem('czy_pracownik');
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

  userInfo() {
    this.router.navigate(["/userInfo"]);
  }

}

/*
window.onload = function () {
  console.log("RELOADED");
}
*/
