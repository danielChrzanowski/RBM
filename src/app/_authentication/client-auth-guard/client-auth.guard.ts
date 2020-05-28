import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ClientAuthGuardService } from './client-auth.service';

@Injectable()
export class ClientAuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private authService: ClientAuthGuardService
    ) { }

    canActivate() {
        if (this.authService.isLoggedIn()) {
            return true;
        }
        this.router.navigate(['/log-in']);
        return false;
    }


}