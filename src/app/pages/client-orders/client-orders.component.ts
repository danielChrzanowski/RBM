import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { Order } from 'src/app/models/order-model/order-model';
import { UserSingleton } from 'src/app/models/user-singleton/user-singleton.service';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {
  clientOrders;
  displayedColumns: string[] = ['zamowienie_id', 'data', 'suma_cen', 'dania', 'stan', 'adres', 'telefon'];
 
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('pdfDiv') pdfDiv: ElementRef;

  constructor(
    private orderService: OrderService,
    private userSingleton: UserSingleton) { }

  ngOnInit(): void {
    this.getClientOrders();

    //interval
    // this.interval = setInterval(() => {
    //  this.getClientOrders();
    // }, 400);
  }

  getClientOrders() {
    this.orderService.getClientOrders(this.userSingleton.getId())
      .subscribe(
        data => {
          //console.log(data);
          this.clientOrders = new MatTableDataSource<Order>(data);
          this.clientOrders.sort = this.sort;
          this.clientOrders.paginator = this.paginator;
        },
        error => console.log(error));
  }

  //pobierz widok jako pdf
  exportAsPDF() {
    let data = this.pdfDiv.nativeElement;
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/jpeg')

      //Generates PDF in landscape mode
      //let pdf = new jsPDF('l', 'cm', 'a4');

      //Generates PDF in portrait mode
      let pdf = new jsPDF('l', 'cm', 'a4');

      //var width = pdf.internal.pageSize.getWidth();
      //var height = pdf.internal.pageSize.getHeight();

      pdf.addImage(contentDataURL, 'PNG', -0.6, 0);
      pdf.save('Orders.pdf');
    });
  }

}
