import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl = "https://localhost:8443";

  constructor(private http: HttpClient) { }

  public getTodayOrders(): Observable<any> {
    return this.http.get(`${this.baseUrl}/getTodayOrders`);
  }

  public getClientOrders(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/getClientOrders/` + id);
  }

}
