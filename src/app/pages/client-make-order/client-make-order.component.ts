import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-make-order',
  templateUrl: './client-make-order.component.html',
  styleUrls: ['./client-make-order.component.scss']
})
export class ClientMakeOrderComponent implements OnInit {
  tab: string[] = ["q", "2", "3"];


  constructor() { }

  ngOnInit(): void {
  }

}
