import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserSingleton } from './models/user-singleton/user-singleton.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RBM';

  uzytkownik: UserSingleton;

  constructor(
    private router: Router,
    private userSingleton: UserSingleton,
    @Inject(DOCUMENT) private document: Document
  ) {
    let theme = localStorage.getItem('theme');
    if (theme != null) {
      this.loadTheme(theme);
    }
  }

  ngOnInit() {
    this.uzytkownik = null;
    sessionStorage.removeItem('token');
    // this.uzytkownik = null;
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
    this.uzytkownik = null;
    this.logIn();
  }

  refreshUser() {
    if (sessionStorage.getItem("token") !== null) {
      this.uzytkownik = this.userSingleton.getLoggedUser();
    }
  }

  home() {
    this.router.navigate(["/home"]);
  }

  logIn() {
    this.router.navigate(["/log-in"]);
  }

  contact() {
    this.router.navigate(["/contact"]);
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

