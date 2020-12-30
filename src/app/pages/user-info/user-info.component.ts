import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { PasswordModel } from 'src/app/models/password-model/password-model';
import { UserSingleton } from 'src/app/models/user-singleton/user-singleton.service';
import { UzytkownikServiceService } from 'src/app/services/uzytkownik-service/uzytkownik-service.service';
import { ModalService } from 'src/app/_modal';

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
    private userSingleton: UserSingleton,
    private modalService: ModalService,
    private uzytkownikService: UzytkownikServiceService,
    private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.loggedUser = this.userSingleton.getLoggedUser();
  }

  changePassword() {
    //promise await
    const promise = this.uzytkownikService.
      checkPasswordInDB(this.loggedUser.getId(), this.oldPasswordInput.nativeElement.value).toPromise();

    promise.then(
      data => {
        let passwordModel = new PasswordModel();
        let checkOldPassword = data;

        if (!checkOldPassword) {
          this.openModal("wrongDBPasswordErrorModal");

        } else {
          if (this.newPasswordInput.nativeElement.value != this.newPassword2Input.nativeElement.value) {
            this.openModal("passwordErrorModal");

          } else {
            passwordModel.uzytkownik_id = this.loggedUser.getId();
            passwordModel.password = this.newPasswordInput.nativeElement.value;

            this.uzytkownikService.changePassword(passwordModel)
              .subscribe(data => {
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
    const getPass = this.uzytkownikService.checkPasswordInDB(this.loggedUser.getId(), this.passwordDeleteInput.nativeElement.value).toPromise();
    getPass.then(data => {
     let passwordCorrect = data;
     
      if (passwordCorrect) {
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
