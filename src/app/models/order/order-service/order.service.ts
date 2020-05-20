import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = "https://localhost:8443";

  constructor(private http: HttpClient) { }

  public getAllOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getAllOrders`);
  }

}
