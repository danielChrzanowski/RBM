import { Component, OnInit } from '@angular/core';

import { Router, NavigationEnd } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { OrderService } from 'src/app/models/order/order-service/order.service';
import { Zamowienie } from 'src/app/models/order/order-model/order-model';


@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ShowOrdersComponent {
  orders: Array<Zamowienie>;

  columnsToDisplay = ['zamowienie_id', 'stan'];
  expandedElement: Zamowienie | null;

  constructor(private orderService: OrderService, private router: Router) {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.getTodayOrders();
        }
      }
    );
  }

  getTodayOrders() {
    this.orderService.getTodayOrders()
      .subscribe(
        data => {
          console.log(data);
          this.orders = data;
        },
        error => console.log(error));
  }

}
