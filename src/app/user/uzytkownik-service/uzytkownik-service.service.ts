import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UzytkownikServiceService {

  private baseUrl = "https://localhost:8443";

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  public loggedUserById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/userByIdNoPassword/` + id);
  }

  public createUser(post: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addUser`, post);
  }
}
