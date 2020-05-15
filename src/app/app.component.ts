import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication/auth.service';
import { Uzytkownik } from './konto/uzytkownik/uzytkownik';
import { HttpClient } from '@angular/common/http';
import { UzytkownikServiceService } from './konto/uzytkownik-service/uzytkownik-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Paw';

  uzytkownik: Uzytkownik;

  constructor(private http: HttpClient, private router: Router, private authService: AuthService, private uzytkownikService: UzytkownikServiceService) {
    if (this.uzytkownik == null) {
      this.refreshUser();
    }

  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    this.uzytkownik = null;

    console.log(sessionStorage.getItem('userId'));
    this.home();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  home() {
    this.router.navigate(["/home"]);
  }

  logIn() {
    this.router.navigate(["/log-in"]);
  }

  showUsers() {
    this.router.navigate(["/showUsers"]);
  }

  createUser() {
    this.router.navigate(["/createUser"]);
  }

  refreshUser() {
    if (sessionStorage.length > 1) {
      console.log("wieksza");

      let key = "userId";
      let value = sessionStorage.getItem(key);

      this.uzytkownikService.loggedUserById(value)
        .subscribe(
          data => {
            console.log(data);
            this.uzytkownik = data;
          },
          error => console.log(error));
    } else {
      console.log("mniejsza");
    }
  }

}
