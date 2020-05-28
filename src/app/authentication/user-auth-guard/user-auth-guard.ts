import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserAuthGuardService } from './user-auth-guard.service';

@Injectable()
export class UserAuthGuard implements CanActivate {

    base_url: string;

    constructor(
        private router: Router,
        private authService: UserAuthGuardService
    ) { }

    canActivate() {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/log-in']);
        return false;
    }


}