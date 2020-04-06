import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PierwszaComponent } from './pages/pierwsza/pierwsza.component';
import { DrugaComponent } from './pages/druga/druga.component';

const routes: Routes = [
  { path: 'pierwsza', component: PierwszaComponent },
  { path: 'druga', component: DrugaComponent },
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

export const routingComponents = [PierwszaComponent, DrugaComponent]

//--module app