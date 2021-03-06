import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { UserSingleton } from 'src/app/models/user-singleton/user-singleton.service';
import { UzytkownikServiceService } from 'src/app/services/uzytkownik-service/uzytkownik-service.service';
import { ModalService } from 'src/app/_modal';
import { LoginModel } from '../../models/login-model/login-model';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {
  @ViewChild('loginInput') loginInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;
  private baseUrl = "https://localhost:8443";

  loginFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);

  constructor(
    private appComponent: AppComponent,
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService,
    private userSingleton: UserSingleton,
    private uzytkownikService: UzytkownikServiceService) {
  }

  ngOnInit(): void {
  }

  login() {
    let loginForm = new LoginModel();
    loginForm.username = this.loginInput.nativeElement.value;
    loginForm.password = this.passwordInput.nativeElement.value;

    this.uzytkownikService.login(loginForm)
      .subscribe(data => {
        if (data) {
          sessionStorage.setItem('token', btoa(loginForm.username + ':' + loginForm.password))
          this.setUserSingletonFromDB();
        } else {
          //alert("Błąd autentykacji.");
          this.openModal('loginErrorModal');
        }
      }, error => {
        console.log(error);
        if (error.status == 401) {
          //alert("Odmowa dostępu");
          this.openModal('loginErrorModal');
        }
      });
  }

  setUserSingletonFromDB() {
    let headers: HttpHeaders = new HttpHeaders(
      { 'Authorization': 'Basic ' + sessionStorage.getItem('token') }
    );
    let options = { headers: headers };

    this.http.get(`${this.baseUrl}/user`, options)
      .subscribe(data => {
        this.userSingleton.setLoggedUser(
          data['uzytkownik_id'],
          data['imie'],
          data['nazwisko'],
          data['email'],
          data['czy_pracownik']);
        this.appComponent.refreshUser();
        this.router.navigate(['/menu']);
      }, error => console.log(error));
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
