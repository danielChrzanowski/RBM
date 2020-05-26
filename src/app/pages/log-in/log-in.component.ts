import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoginForm } from './loginForm/loginForm';
import { AppComponent } from 'src/app/app.component';
import { ModalService } from 'src/app/_modal';
import { LoggedUserService } from 'src/app/models/logged-user/logged-user.service';
import { UzytkownikServiceService } from 'src/app/models/user/uzytkownik-service/uzytkownik-service.service';


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

  constructor(private appComponent: AppComponent,
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService,
    private loggedUserService: LoggedUserService,
    private uzytkownikService: UzytkownikServiceService) { }

  ngOnInit(): void {

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
        this.loggedUserService.setUserId(data['uzytkownik_id']);
        //sessionStorage.setItem('czy_pracownik', this.encryptionService.encryptData(data['czy_pracownik']));

        //sessionStorage.setItem('userId', this.encryptionService.encryptData(data['uzytkownik_id']));
        //  console.log("CZY: " + this.encryptionService.decryptData(sessionStorage.getItem('czy_pracownik')));
        // console.log(sessionStorage.getItem('userId'));

        this.setLoggedUser();

        this.appComponent.refreshUser();
      },
        error => console.log(error));
  }

  setLoggedUser() {
    this.uzytkownikService.loggedUserById(this.loggedUserService.getId())
      .subscribe(
        data => {
          this.loggedUserService.setLoggedUser(data['uzytkownik_id'],
            data['imie'],
            data['nazwisko'],
            data['email'],
            data['czy_pracownik']);
          console.log(this.loggedUserService.getLoggedUser());
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

