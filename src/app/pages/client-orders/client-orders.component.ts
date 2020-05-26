import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Zamowienie } from 'src/app/models/order/order-model/order-model';
import { OrderService } from 'src/app/models/order/order-service/order.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router, NavigationEnd } from '@angular/router';
import { LoggedUserService } from 'src/app/models/logged-user/logged-user.service';
import * as jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-client-orders',
  templateUrl: './client-orders.component.html',
  styleUrls: ['./client-orders.component.scss']
})
export class ClientOrdersComponent implements OnInit {

  clientOrders: Array<Zamowienie>;
  displayedColumns: string[] = ['zamowienie_id', 'data', 'suma_cen', 'stan'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('pdfDiv') pdfDiv: ElementRef;

  constructor(private orderService: OrderService, private router: Router, private loggedUserService: LoggedUserService) {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.getClientOrders();
        }
      }
    );

    //do usuniecia
    setInterval(() => {
      this.getClientOrders();
    }, 400);
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

  //pobierz widok jako pdf
  exportAsPDF() {
    let data = this.pdfDiv.nativeElement;
    html2canvas(data).then(canvas => {
      const contentDataURL = canvas.toDataURL('image/png')

      //Generates PDF in landscape mode
      let pdf = new jsPDF('l', 'cm', 'a4');

      //Generates PDF in portrait mode
      //let pdf = new jsPDF('p', 'cm', 'a4');

      var width = pdf.internal.pageSize.getWidth();
      var height = pdf.internal.pageSize.getHeight();

      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
      pdf.save('orders.pdf');
    });
  }

  //pobierz pdf bez polskich znakow
  exportAsPDF2() {
    let doc = new jsPDF('1', 'pt', 'a4');

    let specialElementHandlers = {
      '#editor': function (element, renderer) {
        return true;
      }
    };

    let pdfDiv = this.pdfDiv.nativeElement;

    doc.fromHTML(pdfDiv.innerHTML, 15, 15, {
      width: 1900,
      'elementHandlers': specialElementHandlers
    });

    doc.save('orders.pdf');
  }
}
