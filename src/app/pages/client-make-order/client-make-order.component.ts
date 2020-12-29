import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OrderNoID } from 'src/app/models/order-model/orderNoID-model';
import { UserSingleton } from 'src/app/models/user-singleton/user-singleton.service';
import { OrderService } from 'src/app/services/order-service/order.service';
import { ModalService } from 'src/app/_modal';

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
  date;
  jsonUser;
  currentOrder;
  dishes;
  totalPrice;
  adress;
  phone: number;

  @ViewChild('adressInput') adressInput: ElementRef;
  @ViewChild('phoneInput') phoneInput: ElementRef;

  adressFormControl = new FormControl('', [
    Validators.required
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required
  ]);

  constructor(private datePipe: DatePipe,
    private userSingleton: UserSingleton,
    private orderService: OrderService,
    private router: Router,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.loggedUser = null;
    this.refreshUser();

    this.currentOrder = JSON.parse(localStorage.getItem("currentOrder"));
    this.menu = JSON.parse(localStorage.getItem("menu"));

    this.dishes = [];
    this.totalPrice = 0;
    this.currentOrder.forEach(element => {
      this.dishes.push({ danie_id: element.id });
      this.totalPrice += element.cena;
    });

    let myDate = new Date();
    this.date = this.datePipe.transform(myDate, 'yyyy-MM-dd');

    this.jsonUser = {
      uzytkownik_id: this.loggedUser.getId()
    };
  }

  refreshUser() {
    if (sessionStorage.length > 0) {
      this.loggedUser = this.userSingleton.getLoggedUser();
    }
  }

  submitOrder() {
    this.adress = this.adressInput.nativeElement.value;
    this.phone = this.phoneInput.nativeElement.value;

    this.order = new OrderNoID(this.date, this.totalPrice, "Nowe", this.adress, this.phone, this.jsonUser, this.dishes);

    this.orderService.addOrder(this.order)
      .subscribe(data => {
        //  console.log(data);
        localStorage.removeItem("currentOrder");
        this.openModal("orderSubmittedModal");
      }, error => console.log(error));
  }

  backToMenu() {
    this.router.navigate(["/menu"]);
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  navigateMenu() {
    this.router.navigate(["menu"]);
  }

}
