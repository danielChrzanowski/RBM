import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order-model/order-model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = "https://localhost:8443";

  constructor(private http: HttpClient) { }

  public getTodayOrders(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + sessionStorage.getItem("token"));
    //console.log(headers);
    return this.http.get(`${this.baseUrl}/findAllOrders`, { headers: headers });
  }

  public changeOrderState(order: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + sessionStorage.getItem("token"));
    console.log(order);
    return this.http.put(`${this.baseUrl}/changeOrderState`, order, { headers: headers });
  }

  public getClientOrders(id: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + sessionStorage.getItem("token"));
    //console.log(headers);
    return this.http.get(`${this.baseUrl}/getClientOrders/` + id, { headers: headers });
  }

}
