import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule, routingComponents } from './routing.module';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './authentication/auth-guard-client/auth.guard';
import { AuthService } from './authentication/auth-guard-client/auth.service';
import { ModalModule } from './_modal';
import { AuthGuardEmployee } from './authentication/auth-guard-employee/auth-guard-employee';
import { AuthGuardEmployeeService } from './authentication/auth-guard-employee/auth-guard-employee.service';
import { UserAuthGuard } from './authentication/user-auth-guard/user-auth-guard';
import { UserAuthGuardService } from './authentication/user-auth-guard/user-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
  ],
  imports: [
    RoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ModalModule
  ],
  providers: [UserAuthGuard, UserAuthGuardService, AuthGuard, AuthService, AuthGuardEmployee, AuthGuardEmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
