import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RoutingModule, routingComponents } from './routing.module';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './authentication/auth.guard';
import { AuthService } from './authentication/auth.service';
import { ModalModule } from './_modal';
import { ClientOrdersComponent } from './pages/client-orders/client-orders.component';
import { ClientMakeOrderComponent } from './pages/client-make-order/client-make-order.component';
import { RestauramtMenuComponent } from './pages/restauramt-menu/restauramt-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    ClientOrdersComponent,
    ClientMakeOrderComponent,
    RestauramtMenuComponent,
  ],
  imports: [
    RoutingModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ModalModule
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
