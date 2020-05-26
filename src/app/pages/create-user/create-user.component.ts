import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_modal';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UzytkownikServiceService } from 'src/app/models/uzytkownik-service/uzytkownik-service.service';
import { RegisterForm } from './register-form/registerForm';
import { FormControl, Validators } from '@angular/forms';
import { LoggedUserService } from 'src/app/models/logged-user/logged-user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  private baseUrl = "https://localhost:8443";
  registerForm: RegisterForm;
  password2: string;
  tempUser;

  constructor(private http: HttpClient,
    private router: Router,
    private modalService: ModalService,
    private uzytkownikService: UzytkownikServiceService,
    private loggedUserService: LoggedUserService) { }

  ngOnInit(): void {
    this.registerForm = new RegisterForm();
  }

  register() {
    if (this.registerForm.login == null ||
      this.registerForm.password == null ||
      this.registerForm.imie == null ||
      this.registerForm.nazwisko == null ||
      this.registerForm.email == null ||
      this.registerForm.login == "" ||
      this.registerForm.password == "" ||
      this.registerForm.imie == "" ||
      this.registerForm.nazwisko == "" ||
      this.registerForm.email == "") {
      this.openModal("emptyFieldErrorModal");

      /*
      console.log("login: " + this.registerForm.login);
      console.log("haslo: " + this.registerForm.password);
      console.log("imie: " + this.registerForm.imie);
      console.log("nazw: " + this.registerForm.nazwisko);
      console.log("email: " + this.registerForm.email);
      */
    } else {
      /*
      console.log("login: " + this.registerForm.login);
      console.log("haslo: " + this.registerForm.password);
      console.log("imie: " + this.registerForm.imie);
      console.log("nazw: " + this.registerForm.nazwisko);
      console.log("email: " + this.registerForm.email);
      */

      const getUser = this.uzytkownikService.userByLogin(this.registerForm.login).toPromise();
      getUser.then(data => {
        console.log(data);
        this.tempUser = data;

        if (this.tempUser != null && this.tempUser.login == this.registerForm.login) {
          this.registerForm.login = null;
          this.openModal('loginErrorModal');
        } else {

          if (this.registerForm.password != this.password2) {
            this.registerForm.password = null;
            this.openModal("passwordErrorModal");

          } else {
            this.uzytkownikService.createUser(this.registerForm)
              .subscribe(data => {
                console.log(data);

              }, error => console.log(error));
            this.registerForm = new RegisterForm();
            this.router.navigate(["/log-in"]);
          }
        }
      });

    }
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


}
