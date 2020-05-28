import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UzytkownikServiceService } from 'src/app/services/uzytkownik-service/uzytkownik-service.service';
import { ModalService } from 'src/app/_modal';
import { RegisterModel } from '../../models/register-model/register-model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  @ViewChild('loginInput') loginInput: ElementRef;
  @ViewChild('passwordInput') passwordInput: ElementRef;
  @ViewChild('password2Input') password2Input: ElementRef;
  @ViewChild('imieInput') imieInput: ElementRef;
  @ViewChild('nazwiskoInput') nazwiskoInput: ElementRef;
  @ViewChild('emailInput') emailInput: ElementRef;

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

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: ModalService,
    private uzytkownikService: UzytkownikServiceService) { }

  ngOnInit(): void {
  }

  register() {
    let registerForm = new RegisterModel();
    registerForm.login = this.loginInput.nativeElement.value;
    registerForm.password = this.passwordInput.nativeElement.value;
    let password2 = this.password2Input.nativeElement.value;
    registerForm.imie = this.imieInput.nativeElement.value;
    registerForm.nazwisko = this.nazwiskoInput.nativeElement.value;
    registerForm.email = this.emailInput.nativeElement.value;

    const getUser = this.uzytkownikService.userByLogin(registerForm.login).toPromise();

    getUser.then(data => {
      console.log(data);
      let tempUser = data;

      if (tempUser != null && tempUser.login == registerForm.login) {
        registerForm.login = null;
        this.openModal('loginErrorModal');
      } else {

        if (registerForm.password != password2) {
          registerForm.password = null;
          this.openModal("passwordErrorModal");

        } else {
          this.uzytkownikService.createUser(registerForm)
            .subscribe(data => {
              console.log(data);

            }, error => console.log(error));

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
