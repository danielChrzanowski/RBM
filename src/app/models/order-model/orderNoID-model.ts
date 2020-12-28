import { Dish } from "../dish-model/dish-model";

export class OrderNoID {
    data: string;
    suma_cen: number;
    stan: string;
    adres: string;
    telefon: number;
    uzytkownik;
    dania;

    constructor(data, suma_cen, stan, adres, telefon, uzytkownik, dania) {
        this.data = data;
        this.suma_cen = suma_cen;
        this.stan = stan;
        this.adres = adres;
        this.telefon = telefon;
        this.uzytkownik = uzytkownik;
        this.dania = dania;
    }

}