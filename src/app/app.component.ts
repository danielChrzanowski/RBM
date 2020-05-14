import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Paw';

  constructor(private router: Router, private authService: AuthService) { }

  logout() {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');

    console.log("Wylogowano: " + sessionStorage.getItem('userId'));
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


}
