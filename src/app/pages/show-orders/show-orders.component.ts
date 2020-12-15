import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/models/order-model/order-model';
import { OrderService } from 'src/app/services/order-service/order.service';

interface State {
  value: string;
  viewValue: string;
}

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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Order>;
  selectedState;

  states: State[] = [
    { value: 'Nowe', viewValue: 'Nowe' },
    { value: 'W trakcie', viewValue: 'W trakcie' },
    { value: 'Do wydania', viewValue: 'Do wydania' },
    { value: 'Zakończone', viewValue: 'Zakończone' }
  ];

  tableDef: Array<any> = [
    {
      key: 'zamowienie_id',
      header: 'ID'
    }, {
      key: 'stan',
      header: 'Stan'
    }
  ];
  columnsToDisplay = ['zamowienie_id', 'stan'];
  expandedElement: Order | null;

  constructor(
    private orderService: OrderService) {
  }

  ngOnInit() {
    this.getTodayOrders();
  }

  getTodayOrders() {
    this.orderService.getTodayOrders()
      .subscribe(
        data => {
          console.log(data);
          this.dataSource = new MatTableDataSource<Order>(data);
          this.dataSource.paginator = this.paginator;
        },
        error => console.log(error));
  }

  saveState(order) {
    if (this.selectedState) {
      let newOrder = new Order(
        order.zamowienie_id,
        order.data,
        order.suma_cen,
        this.selectedState,
        order.uzytkownik_id,
        order.dania
      );

      console.log(this.selectedState + " ID: " + order.zamowienie_id);

      this.orderService.changeOrderState(newOrder)
        .subscribe(data => {
          console.log(data);

          this.selectedState=null;
          this.getTodayOrders();
        }, error => console.log(error));

    }
  }

}
