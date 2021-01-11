export class InputDish {
    nazwa: string;
    skladniki: string;
    kategoria: string;
    cena;
    kalorie;
    zdjecie;

    constructor(nazwa, skladniki, kategoria, cena, kalorie, zdjecie) {
        this.nazwa = nazwa;
        this.skladniki = skladniki;
        this.kategoria = kategoria;
        this.cena = cena;
        this.kalorie = kalorie;
        this.zdjecie = zdjecie;
    }
}