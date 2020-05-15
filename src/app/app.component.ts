import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Uzytkownik } from './konto/uzytkownik/uzytkownik';
import { HttpClient } from '@angular/common/http';
import { UzytkownikServiceService } from './konto/uzytkownik-service/uzytkownik-service.service';
import { EncryptionService } from './encryption/encryption.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Paw';

  uzytkownik: Uzytkownik;

  constructor(private http: HttpClient,
    private router: Router,
    private uzytkownikService: UzytkownikServiceService,
    private encryptionService: EncryptionService) {

    if (this.uzytkownik != null) {
      this.refreshUser();
    }

  }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    this.uzytkownik = null;

    this.home();
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
    if (sessionStorage.length > 0) {

      let value = this.encryptionService.decryptData(sessionStorage.getItem("userId"));
      console.log("wartosc: " + value);

      this.uzytkownikService.loggedUserById(value)
        .subscribe(
          data => {
            console.log(data);
            this.uzytkownik = data;
          },
          error => console.log(error));
    }
  }

}

window.onload = function () {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('userId');
  this.uzytkownik = null;

  console.log("RELOADED");
}

