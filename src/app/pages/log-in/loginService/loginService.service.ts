import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  private baseUrl = "https://localhost:8443";

  constructor(private http: HttpClient) { }

  getUserData() {
    let headers: HttpHeaders = new HttpHeaders(
      { 'Authorization': 'Basic ' + sessionStorage.getItem('token') }
    );

    let options = { headers: headers };


    this.http.get(`${this.baseUrl}/user`, options)
      .subscribe(data => {
        console.log(data);
        sessionStorage.setItem('userId', data['uzytkownik_id']);
        console.log(sessionStorage.getItem('userId'));

      },
        error => console.log(error));

  }



}
