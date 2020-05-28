import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { EmployeeAuthGuardService } from './employee-auth-guard.service';

@Injectable()
export class EmployeeAuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: EmployeeAuthGuardService
    ) { }

    canActivate() {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/log-in']);
        return false;
    }


}