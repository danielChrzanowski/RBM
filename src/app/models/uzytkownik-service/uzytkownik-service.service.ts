import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterForm } from 'src/app/pages/create-user/register-form/registerForm';
import { PasswordModel } from '../password-model/password-model';

@Injectable({
  providedIn: 'root'
})
export class UzytkownikServiceService {

  private baseUrl = "https://localhost:8443";

  constructor(private http: HttpClient) { }

  public loggedUserById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/userByIdNoPassword/` + id);
  }

  public getPasswordById(id: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/passwordById/` + id);
  }

  public createUser(user: RegisterForm): Observable<any> {
    return this.http.post(`${this.baseUrl}/addUser`, user);
  }

  public changePassword(passwordModel: PasswordModel): Observable<any> {
    return this.http.post(`${this.baseUrl}/changePassword`, passwordModel);
  }

  public deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteUser/` + id);
  }

  public userByLogin(login: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/userByLogin/` + login);
  }

  public login(loginForm: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, loginForm);
  }
}
