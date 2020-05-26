import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthGuardEmployeeService } from './auth-guard-employee.service';



@Injectable()
export class AuthGuardEmployee implements CanActivate {

    base_url: string;

    constructor(private router: Router
        , private authService: AuthGuardEmployeeService) {}

    canActivate() {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/log-in']);
        return false;
    }


}