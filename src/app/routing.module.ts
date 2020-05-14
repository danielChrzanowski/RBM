import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

import { ShowUsersComponent } from './pages/show-users/show-users.component';
import { CreateUserComponent } from './pages/create-user/create-user.component';
import { LogInComponent } from './pages/log-in/log-in.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'showUsers', component: ShowUsersComponent },
  { path: 'createUser', component: CreateUserComponent }
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

export const routingComponents = [HomeComponent, LogInComponent, ShowUsersComponent, CreateUserComponent]

//--module app