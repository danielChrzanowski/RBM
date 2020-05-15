import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router:Router) { }

  isLoggedIn(){
    if(sessionStorage.getItem('token')==null){
      this.router.navigate(['/log-in']);
      return false;
    }else{
      return true;
    }     
  }

}
