import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PierwszaComponent } from './pierwsza/pierwsza.component';

const routes: Routes = [
  { path: 'pierwsza', component: PierwszaComponent },
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

export const routingComponents = [PierwszaComponent]

//--module app