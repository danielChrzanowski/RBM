import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EncryptionService } from 'src/app/encryption/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardEmployeeService {

  constructor(private router: Router, private encryptionService: EncryptionService) { }

  isLoggedIn() {
    if (sessionStorage.getItem('token') != null && this.encryptionService.decryptData(sessionStorage.getItem("czy_pracownik")) == true) {
      return true;
    } else {
      this.router.navigate(['/log-in']);
      return false;
    }
  }
}
