import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDishComponent } from './pages/add-dish/add-dish.component';
import { ClientMakeOrderComponent } from './pages/client-make-order/client-make-order.component';
import { ClientOrdersComponent } from './pages/client-orders/client-orders.component';
import { ContactComponent } from './pages/contact/contact.component';
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
  { path: 'contact', component: ContactComponent },
  { path: 'showOrders', canActivate: [EmployeeAuthGuard], component: ShowOrdersComponent },
  { path: 'addDish', canActivate: [EmployeeAuthGuard], component: AddDishComponent },
  { path: 'createUser', component: CreateUserComponent },
  { path: 'menu', component: RestauramtMenuComponent },
  { path: 'clientOrders', canActivate: [ClientAuthGuard], component: ClientOrdersComponent },
  { path: 'makeOrder', canActivate: [UserAuthGuard], component: ClientMakeOrderComponent },
  { path: 'userInfo', canActivate: [UserAuthGuard], component: UserInfoComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })
  ],
  exports: [
    RouterModule
  ]
})

export class RoutingModule { }

export const routingComponents = [HomeComponent, LogInComponent, ContactComponent, ShowOrdersComponent, AddDishComponent, CreateUserComponent,
  RestauramtMenuComponent, ClientOrdersComponent, ClientMakeOrderComponent, UserInfoComponent]
