import { Component, OnInit } from '@angular/core';
import { Uzytkownik } from '../uzytkownik-model/uzytkownik.model';
import { UzytkownikServiceService } from '../uzytkownik-service/uzytkownik-service.service';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-show-users',
  templateUrl: './show-users.component.html',
  styleUrls: ['./show-users.component.scss']
})
export class ShowUsersComponent implements OnInit {
  uzytkownicy: Array<Uzytkownik>;

  constructor(private uzytkownikService: UzytkownikServiceService, private router: Router) {
    this.router.events.subscribe(
      (event) => {
        if(event instanceof NavigationEnd){
          this.getAll();
        }
      }
    );
   }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.uzytkownikService.getAll()
      .subscribe(
        data => {
          console.log(data);
          this.uzytkownicy = data;
        },
        error => console.log(error));
  }

}
