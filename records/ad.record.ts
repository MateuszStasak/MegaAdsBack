import {AdEntity} from "../types";
import {ValidationError} from "../utils/error";

interface NewAdEntity extends Omit<AdEntity, 'id'> {
    id?:string;
}

export class AdRecord implements AdEntity {

    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public latitude: number;
    public longitude: number;

    constructor(obj: NewAdEntity) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogłoszenia nie może być pusta , ani przekraczać 100 znaków.')
        }

        if (obj.description.length > 1000) {
            throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków.')
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie może być mniejsza niż 0 lub większa niż 9 999 999.')
        }

        if (!obj.url || obj.name.length > 100) {
            throw new ValidationError('Link do ogłoszenia nie może być pusty , ani przekraczać 100 znaków.')
        }

        if (typeof obj.latitude !== 'number' || typeof obj.longitude !== 'number') {
            throw new ValidationError('Nie można zlokalizować ogłoszenia.')
        }

        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.latitude = obj.latitude;
        this.longitude = obj.longitude;
    }
}