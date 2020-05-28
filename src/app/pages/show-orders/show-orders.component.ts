import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Order } from 'src/app/models/order-model/order-model';
import { OrderService } from 'src/app/services/order-service/order.service';

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

export class ShowOrdersComponent implements OnInit {
  orders: Array<Order>;

  columnsToDisplay = ['zamowienie_id', 'stan'];
  expandedElement: Order | null;

  constructor(
    private orderService: OrderService,
    private router: Router) {
  }

  ngOnInit() {
    this.getTodayOrders();
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
