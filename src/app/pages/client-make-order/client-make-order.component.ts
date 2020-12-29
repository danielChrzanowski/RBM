import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { OrderNoID } from 'src/app/models/order-model/orderNoID-model';
import { UserSingleton } from 'src/app/models/user-singleton/user-singleton.service';
import { OrderService } from 'src/app/services/order-service/order.service';

@Component({
  selector: 'app-client-make-order',
  templateUrl: './client-make-order.component.html',
  styleUrls: ['./client-make-order.component.scss'],
  providers: [DatePipe]
})
export class ClientMakeOrderComponent implements OnInit {
  order: OrderNoID;
  menu: any;
  loggedUser: UserSingleton;

  constructor(private datePipe: DatePipe,
    private userSingleton: UserSingleton,
    private orderService: OrderService) { }

  ngOnInit(): void {
    this.loggedUser = null;
    this.refreshUser();

    let LSOrder = JSON.parse(localStorage.getItem("currentOrder"));
    this.menu = JSON.parse(localStorage.getItem("menu"));

    let dishes = [];
    let totalPrice = 0;
    LSOrder.forEach(element => {
      dishes.push({ danie_id: element.id });
      totalPrice += element.cena;
    });

    let myDate = new Date();
    let date = this.datePipe.transform(myDate, 'yyyy-MM-dd');

    let jsonUser = {
      uzytkownik_id: this.loggedUser.getId()
    };

    this.order = new OrderNoID(date, totalPrice, "Nowe", "Adres", 99999999, jsonUser, dishes);
  }

  refreshUser() {
    if (sessionStorage.length > 0) {
      this.loggedUser = this.userSingleton.getLoggedUser();
    }
  }

  submitOrder() {
    this.orderService.addOrder(this.order)
      .subscribe(data => {
        //  console.log(data);
      }, error => console.log(error));
  }

}
