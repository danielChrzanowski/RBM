import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/_modal';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UzytkownikServiceService } from 'src/app/models/uzytkownik-service/uzytkownik-service.service';
import { RegisterForm } from './register-form/registerForm';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  private baseUrl = "https://localhost:8443";
  registerForm: RegisterForm;
  password2: string;

  constructor(private http: HttpClient,
    private router: Router,
    private modalService: ModalService,
    private uzytkownikService: UzytkownikServiceService) {
    this.registerForm = new RegisterForm();
  }

  ngOnInit(): void {
  }

  register() {
    if (this.registerForm.login == null ||
      this.registerForm.password == null ||
      this.registerForm.imie == null ||
      this.registerForm.nazwisko == null ||
      this.registerForm.email == null) {
      this.openModal("emptyFieldErrorModal");

    } else {
      if (this.registerForm.password != this.password2) {
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
  }
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }


}
