import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginForm } from './loginForm/loginForm';

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

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.setItem('token', null);
    sessionStorage.setItem('userId', null);
  }

  //@ViewChild('login') loginInput: ElementRef;
  //@ViewChild('password') passwordInput: ElementRef;

  login() {
    //let login = this.loginInput.nativeElement.value;
    //let password = this.passwordInput.nativeElement.value;

    //this.loginForm.username = login;
    //this.loginForm.password = password;

    this.http.post(`${this.baseUrl}/login`, this.loginForm)
      .subscribe(data => {
        console.log(data);
        if (data) {
          sessionStorage.setItem('token', btoa(this.loginForm.username + ':' + this.loginForm.password))
          console.log("Zalogowano: " + sessionStorage.getItem('token'));
          this.getUserData();
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
    let headers: HttpHeaders = new HttpHeaders(
      { 'Authorization': 'Basic ' + sessionStorage.getItem('token') }
    );

    let options = { headers: headers };

    this.http.get(`${this.baseUrl}/user`, options)
      .subscribe(data => {
        console.log(data);
        sessionStorage.setItem('userId', data['id']);
        console.log(sessionStorage.getItem('userId'));
      },
        error => console.log(error));
  }


}
