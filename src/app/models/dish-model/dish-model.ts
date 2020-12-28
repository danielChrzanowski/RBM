export class Dish {
    danie_id: number;
    skladniki: string;
    cena;
    kategoria: string;

    constructor(danie_id, skladniki, cena, kategoria) {
        this.danie_id = danie_id;
        this.skladniki = skladniki;
        this.cena = cena;
        this.kategoria = kategoria;
    }
}