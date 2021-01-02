import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  lat = 50.297578951329285;
  lng = 19.13494280488898;

  constructor() {
  }

  ngOnInit(): void {
  }

}
