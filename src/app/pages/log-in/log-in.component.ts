import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginForm } from './loginForm/loginForm';
import { LoginServiceService } from './loginService/loginService.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  loginFormControl = new FormControl('', [
    Validators.required
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required
  ]);

  private baseUrl = "https://localhost:8443";
  loginForm: LoginForm = new LoginForm();

  constructor(private appComponent: AppComponent, private http: HttpClient, private router: Router, private loginService: LoginServiceService) { }

  ngOnInit(): void {
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('userId', null);
  }

  login() {
    this.http.post(`${this.baseUrl}/login`, this.loginForm)
      .subscribe(data => {
        console.log(data);
        if (data) {
          sessionStorage.setItem('token', btoa(this.loginForm.username + ':' + this.loginForm.password))
          console.log(sessionStorage.getItem('token'));
          
          this.getUserData();

          setTimeout(() => {
            this.appComponent.home();
          }, 100);


          this.router.navigate(['home']);
        } else {

          //modal zły login lub hasło
          alert("Błąd autentykacji.");
        }
      },
        error => {
          console.log(error);
          if (error.status == 401) {
            alert("Odmowa dostępu.");
          }
        });
  }

  getUserData() {
    this.loginService.getUserData();
  }


}
