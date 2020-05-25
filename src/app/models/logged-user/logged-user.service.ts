import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggedUserService {
  uzytkownik_id: number;
  imie: string;
  nazwisko: string;
  email: string;
  czy_pracownik: boolean;

  getLoggedUser() {
    return this;
  }

  setLoggedUser(uzytkownik_id: number,
    imie: string,
    nazwisko: string,
    email: string,
    czy_pracownik: boolean) {

    this.uzytkownik_id = uzytkownik_id;
    this.imie = imie;
    this.nazwisko = nazwisko;
    this.email = email;
    this.czy_pracownik = czy_pracownik;

  }

  setCzy_pracownik(value: boolean) {
    this.czy_pracownik = value;
  }

  getCzy_pracownik() {
    return this.czy_pracownik;
  }

}
