import { Dish } from "../dish-model/dish-model";

export class Order {
    zamowienie_id: number;
    data: string;
    suma_cen: number;
    stan: string;
    adres: string;
    telefon: number;
    uzytkownik_id: number;
    dania: Array<Dish>;

    constructor(zamowienie_id, data, suma_cen, stan, adres, telefon, uzytkownik_id, dania) {
        this.zamowienie_id = zamowienie_id;
        this.data = data;
        this.suma_cen = suma_cen;
        this.stan = stan;
        this.adres = adres;
        this.telefon = telefon;
        this.uzytkownik_id = uzytkownik_id;
        this.dania = dania;
    }
}