import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  private baseUrl = "https://localhost:8443";
  constructor(private http: HttpClient) {
  }

  public findAllDishes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/findAllDishes`);
  }

  public recommendDishes(id): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Basic ' + sessionStorage.getItem("token"));
    return this.http.get(`${this.baseUrl}/recommendDishes/` + id, { headers: headers });
  }

}
