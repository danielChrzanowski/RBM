export class CurrentOrderDish {
    currentId: number;
    id: number;
    nazwa: string;
    cena: number;

    constructor(currentId, id, nazwa, cena) {
        this.currentId = currentId;
        this.id = id;
        this.nazwa = nazwa;
        this.cena = cena;
    }
}