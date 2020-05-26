import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { ShowOrdersComponent } from './pages/show-orders/show-orders.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { LogInComponent } from './pages/log-in/log-in.component';
import { AuthGuard } from './authentication/auth-guard-client/auth.guard';
import { ClientOrdersComponent } from './pages/client-orders/client-orders.component';
import { ClientMakeOrderComponent } from './pages/client-make-order/client-make-order.component';
import { RestauramtMenuComponent } from './pages/restauramt-menu/restauramt-menu.component';
import { AuthGuardEmployee } from './authentication/auth-guard-employee/auth-guard-employee';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'showOrders', canActivate: [AuthGuardEmployee], component: ShowOrdersComponent },
  { path: 'createUser', component: CreateUserComponent },
  { path: 'menu', component: RestauramtMenuComponent },
  { path: 'clientOrders',canActivate: [AuthGuard], component: ClientOrdersComponent },
  { path: 'makeOrder',canActivate: [AuthGuard], component: ClientMakeOrderComponent }
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
  RestauramtMenuComponent, ClientOrdersComponent, ClientMakeOrderComponent]

//--module app