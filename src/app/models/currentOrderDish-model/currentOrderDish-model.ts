export class CurrentOrderDish {
    currentId: number;
    id: number;
    nazwa: string;

    constructor(currentId, id, nazwa) {
        this.currentId = currentId;
        this.id = id;
        this.nazwa = nazwa;
    }
}