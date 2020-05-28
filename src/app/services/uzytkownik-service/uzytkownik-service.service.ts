import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RegisterModel } from 'src/app/models/register-model/register-model';
import { PasswordModel } from '../../models/password-model/password-model';

@Injectable({
  providedIn: 'root'
})
export class UzytkownikServiceService {

  private baseUrl = "https://localhost:8443";

  constructor(private http: HttpClient) { }

  public login(loginForm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginForm);
  }

  public loggedUserById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/userByIdNoPassword/` + id);
  }

  public userByLogin(login: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/userByLogin/` + login);
  }

  public getPasswordById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/passwordById/` + id);
  }

  public createUser(user: RegisterModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/addUser`, user);
  }

  public changePassword(passwordModel: PasswordModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/changePassword`, passwordModel);
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser/` + id);
  }

}
