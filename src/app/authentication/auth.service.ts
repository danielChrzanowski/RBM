import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(){
    if(sessionStorage.getItem('token')==null){
      return false;
    }else{
      return true;
    }     
  }

}
