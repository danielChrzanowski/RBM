import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PierwszaComponent } from './pages/pierwsza/pierwsza.component';
import { DrugaComponent } from './pages/druga/druga.component';
import { ShowUsersComponent } from './pages/konto/show-users/show-users.component';
import { CreateUserComponent } from './pages/konto/create-user/create-user.component';

const routes: Routes = [
  { path: 'pierwsza', component: PierwszaComponent },
  { path: 'druga', component: DrugaComponent },
  { path: 'showUsers', component: ShowUsersComponent},
  { path: 'createUser', component: CreateUserComponent },
  { path: '', redirectTo: 'pierwsza', pathMatch: 'full' }
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

export const routingComponents = [PierwszaComponent, DrugaComponent, ShowUsersComponent, CreateUserComponent]

//--module app