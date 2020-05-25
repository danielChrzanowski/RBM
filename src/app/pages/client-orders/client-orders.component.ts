import { Component, OnInit, ViewChild } from '@angular/core';
import { Zamowienie } from 'src/app/models/order/order-model/order-model';
import { OrderService } from 'src/app/models/order/order-service/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router, NavigationEnd } from '@angular/router';
import { LoggedUserService } from 'src/app/models/logged-user/logged-user.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {

  clientOrders: Array<Zamowienie>;
  displayedColumns: string[] = ['zamowienie_id', 'data', 'suma_cen', 'stan'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private orderService: OrderService, private router: Router, private loggedUserService: LoggedUserService) {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.getClientOrders();
        }
      }
    );
  }

  ngOnInit(): void {
  }

  getClientOrders() {
    this.orderService.getClientOrders(this.loggedUserService.getId())
      .subscribe(
        data => {
          console.log(data);
          this.clientOrders = data;
        },
        error => console.log(error));
  }

}
