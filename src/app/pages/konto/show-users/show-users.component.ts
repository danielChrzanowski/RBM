import { Component, OnInit } from '@angular/core';
import { Uzytkownik } from '../uzytkownik-model/uzytkownik.model';
import { UzytkownikServiceService } from '../uzytkownik-service/uzytkownik-service.service';
import { Router, NavigationEnd } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class ShowUsersComponent {
  uzytkownicy: Array<Uzytkownik>;

  columnsToDisplay = ['imie', 'nazwisko'];
  expandedElement: Uzytkownik | null;

  constructor(private uzytkownikService: UzytkownikServiceService, private router: Router) {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.getAll();
        }
      }
    );
  }



  getAll() {
    this.uzytkownikService.getAll()
      .subscribe(
        data => {
          console.log(data);
          this.uzytkownicy = data;
        },
        error => console.log(error));
  }

}
