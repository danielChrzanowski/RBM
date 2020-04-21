import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UzytkownikServiceService {

  private baseUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  public createUser(post: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addUser`, post);
  }
}
