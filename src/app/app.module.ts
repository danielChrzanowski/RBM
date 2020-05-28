import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { routingComponents, RoutingModule } from './routing.module';
import { ClientAuthGuard } from './_authentication/client-auth-guard/client-auth.guard';
import { ClientAuthGuardService } from './_authentication/client-auth-guard/client-auth.service';
import { EmployeeAuthGuard } from './_authentication/employee-auth-guard/employee-auth-guard';
import { EmployeeAuthGuardService } from './_authentication/employee-auth-guard/employee-auth-guard.service';
import { UserAuthGuard } from './_authentication/user-auth-guard/user-auth-guard';
import { UserAuthGuardService } from './_authentication/user-auth-guard/user-auth-guard.service';
import { ModalModule } from './_modal';

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
    ModalModule,
  ],
  providers: [
    UserAuthGuard, UserAuthGuardService,
    ClientAuthGuard, ClientAuthGuardService,
    EmployeeAuthGuard, EmployeeAuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
