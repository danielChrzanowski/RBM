import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginForm } from './loginForm/loginForm';
import { AppComponent } from 'src/app/app.component';
import { ModalService } from 'src/app/_modal';

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

  constructor(private appComponent: AppComponent, private http: HttpClient, private router: Router, private modalService: ModalService) { }

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

          this.router.navigate(['/home']);
        } else {
          this.openModal('loginErrorModal');
          //alert("Błąd autentykacji.");
        }
      },
        error => {
          console.log(error);
          if (error.status == 401) {
            this.openModal('loginErrorModal');
            //alert("Odmowa dostępu");
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
        sessionStorage.setItem('userId', data['uzytkownik_id']);
        console.log(sessionStorage.getItem('userId'));

        this.appComponent.refreshUser();
      },
        error => console.log(error));
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}

