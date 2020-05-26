import { Component, OnInit } from '@angular/core';
import { LoggedUserService } from 'src/app/models/logged-user/logged-user.service';
import { ModalService } from 'src/app/_modal';
import { ChangePasswordForm } from './change-password-form/changePasswordForm';
import { UzytkownikServiceService } from 'src/app/models/uzytkownik-service/uzytkownik-service.service';
import { OldPassForm } from './oldPassForm/oldPassForm';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  loggedUser;
  changePasswordForm;
  oldPassForm;

  constructor(private loggedUserService: LoggedUserService, private modalService: ModalService,
    private uzytkownikService: UzytkownikServiceService, private router: Router,
    private appComponent: AppComponent) { }

  ngOnInit(): void {
    this.oldPassForm = new OldPassForm();
    this.changePasswordForm = new ChangePasswordForm();
    this.loggedUser = this.loggedUserService.getLoggedUser();
  }

  changePassword() {
    if (this.changePasswordForm.oldPassword == null ||
      this.changePasswordForm.password == null ||
      this.changePasswordForm.password2 == null
    ) {
      this.openModal("emptyFieldErrorModal");

    } else {
      //promise await
      const promise = this.uzytkownikService.getPasswordById(this.loggedUser.getId()).toPromise();
      promise.then(
        data => {
          console.log(data);
          this.oldPassForm = data;

          console.log("stare: " + this.oldPassForm.password);

          if (this.oldPassForm.password != this.changePasswordForm.oldPassword) {
            this.openModal("wrongDBPasswordErrorModal");

          } else {
            if (this.changePasswordForm.password != this.changePasswordForm.password2) {
              this.openModal("passwordErrorModal");

            } else {
              this.changePasswordForm.uzytkownik_id = this.loggedUser.getId();
              this.uzytkownikService.changePassword(this.changePasswordForm)
                .subscribe(data => {
                  console.log(data);

                  this.openModal("passwordChangedModal");

                  setTimeout(() => this.logout(), 1000);

                }, error => console.log(error));
              this.changePasswordForm = new ChangePasswordForm();
            }
          }
        },
        error => console.log(error));

    }
  }

  logout() {
    this.appComponent.logout();
  }

  deleteAccount() {
    console.log(this.loggedUser.getId());
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
