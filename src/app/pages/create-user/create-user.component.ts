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

  loginFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(10)
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);

  password2FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);

  imieFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);

  nazwiskoFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(30),
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
  ]);

  constructor(private http: HttpClient,
    private router: Router,
    private modalService: ModalService,
    private uzytkownikService: UzytkownikServiceService,
    private loggedUserService: LoggedUserService) { }

  ngOnInit(): void {
    this.registerForm = new RegisterForm();
  }

  register() {
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

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


}
