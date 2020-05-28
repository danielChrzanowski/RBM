import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientMakeOrderComponent } from './pages/client-make-order/client-make-order.component';
import { ClientOrdersComponent } from './pages/client-orders/client-orders.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { HomeComponent } from './pages/home/home.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { RestauramtMenuComponent } from './pages/restauramt-menu/restauramt-menu.component';
import { ShowOrdersComponent } from './pages/show-orders/show-orders.component';
import { UserInfoComponent } from './pages/user-info/user-info.component';
import { ClientAuthGuard } from './_authentication/client-auth-guard/client-auth.guard';
import { EmployeeAuthGuard } from './_authentication/employee-auth-guard/employee-auth-guard';
import { UserAuthGuard } from './_authentication/user-auth-guard/user-auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'showOrders', canActivate: [EmployeeAuthGuard], component: ShowOrdersComponent },
  { path: 'createUser', component: CreateUserComponent },
  { path: 'menu', component: RestauramtMenuComponent },
  { path: 'clientOrders', canActivate: [ClientAuthGuard], component: ClientOrdersComponent },
  { path: 'makeOrder', canActivate: [ClientAuthGuard], component: ClientMakeOrderComponent },
  { path: 'userInfo', canActivate: [UserAuthGuard], component: UserInfoComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class RoutingModule { }

export const routingComponents = [HomeComponent, LogInComponent, ShowOrdersComponent, CreateUserComponent,
  RestauramtMenuComponent, ClientOrdersComponent, ClientMakeOrderComponent, UserInfoComponent]

//--module app