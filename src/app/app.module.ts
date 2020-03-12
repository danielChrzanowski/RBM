import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule, routingComponents } from './routing.module';
import { MaterialModule } from './material.module';
import { DrugaComponent } from './druga/druga.component';


@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    DrugaComponent,
  ],
  imports: [
    RoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
