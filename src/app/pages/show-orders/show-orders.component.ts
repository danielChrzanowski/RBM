import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from 'src/app/models/order-model/order-model';
import { OrderService } from 'src/app/services/order-service/order.service';

interface OrderState {
  value: string;
}

@Component({
  selector: 'app-show-orders',
  templateUrl: './show-orders.component.html',
  styleUrls: ['./show-orders.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed, void', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
      transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class ShowOrdersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  dataSource: MatTableDataSource<Order>;
  columnsToDisplay = ['zamowienie_id', 'data', 'stan'];
  expandedElement: Order | null;
  tableDef: Array<any> = [
    {
      key: 'zamowienie_id',
      header: 'ID'
    }, {
      key: 'stan',
      header: 'Stan'
    },
    {
      key: 'data',
      header: 'Data'
    }
  ];

  states: OrderState[] = [
    { value: 'Nowe' },
    { value: 'Przygotowywane' },
    { value: 'W drodze' },
    { value: 'Zakończone' }
  ];
  selectedState;

  constructor(
    private orderService: OrderService) {
  }

  ngOnInit() {
    this.findAllOrders();
  }

  findAllOrders() {
    this.orderService.findAllOrders()
      .subscribe(
        data => {
          this.dataSource = new MatTableDataSource<Order>(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
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
        order.adres,
        order.telefon,
        order.uzytkownik_id,
        order.dania
      );

      this.orderService.changeOrderState(newOrder)
        .subscribe(data => {
          this.selectedState = null;
          this.findAllOrders();
        }, error => console.log(error));

    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
