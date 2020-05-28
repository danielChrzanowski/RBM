import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoggedUserService } from 'src/app/models/logged-user/logged-user.service';
import { ModalService } from 'src/app/_modal';
import { UzytkownikServiceService } from 'src/app/models/uzytkownik-service/uzytkownik-service.service';
import { OldPassForm } from './oldPassForm/oldPassForm';
import { AppComponent } from 'src/app/app.component';
import { FormControl, Validators } from '@angular/forms';
import { PasswordModel } from 'src/app/models/password-model/password-model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  @ViewChild('oldPasswordInput') oldPasswordInput: ElementRef;
  @ViewChild('newPasswordInput') newPasswordInput: ElementRef;
  @ViewChild('newPassword2Input') newPassword2Input: ElementRef;
  @ViewChild('passwordDeleteInput') passwordDeleteInput: ElementRef;
  loggedUser;

  oldPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20)
  ]);

  newPasswordFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);

  newPassword2FormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);

  passwordDeleteFormControl = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
  ]);

  constructor(
    private loggedUserService: LoggedUserService,
    private modalService: ModalService,
    private uzytkownikService: UzytkownikServiceService,
    private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.loggedUser = this.loggedUserService.getLoggedUser();
  }

  changePassword() {
    //promise await
    const promise = this.uzytkownikService.getPasswordById(this.loggedUser.getId()).toPromise();

    promise.then(
      data => {
        console.log(data);

        let oldPassForm = new OldPassForm();
        oldPassForm = data;

        console.log("stare: " + oldPassForm.password);

        if (oldPassForm.password != this.oldPasswordInput.nativeElement.value) {
          this.openModal("wrongDBPasswordErrorModal");

        } else {
          if (this.newPasswordInput.nativeElement.value != this.newPassword2Input.nativeElement.value) {
            this.openModal("passwordErrorModal");

          } else {
            let passwordModel = new PasswordModel();
            passwordModel.uzytkownik_id = this.loggedUser.getId();
            passwordModel.password = this.newPasswordInput.nativeElement.value;

            this.uzytkownikService.changePassword(passwordModel)
              .subscribe(data => {
                console.log(data);

                this.openModal("passwordChangedModal");

                setTimeout(() => this.logout(), 1000);

              }, error => console.log(error));

          }
        }
      },
      error => console.log(error));

  }

  logout() {
    this.appComponent.logout();
  }

  checkPasswords() {
    const getPass = this.uzytkownikService.getPasswordById(this.loggedUser.getId()).toPromise();
    getPass.then(data => {
      console.log(data);
      let oldPassForm = new OldPassForm();
      oldPassForm = data;

      if (oldPassForm.password == this.passwordDeleteInput.nativeElement.value) {
        this.openModal('deleteAccountModal');
      } else {
        this.openModal('wrongDBPasswordErrorModal');
      }

    });

  }

  deleteAccount() {
    const promise = this.uzytkownikService.deleteUser(this.loggedUser.getId()).toPromise();
    promise.then(() => { this.logout(); });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

}
