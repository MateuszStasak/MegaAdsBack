import {
    AdEntity,
    NewAdEntity,
    SimpleAdEntity
} from "../types";
import {ValidationError} from "../utils/error";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type AdRecordResults = [AdEntity[], FieldPacket[]];

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

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.latitude = obj.latitude;
        this.longitude = obj.longitude;
    }

    static async getOne(id: string): Promise<AdRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `id` = :id", {
            id: id,
        }) as AdRecordResults;

        return results.length === 0 ? null : new AdRecord(results[0]);
    }

    static async findAll(name: string): Promise<SimpleAdEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as AdRecordResults;

        return results.map(result => {
            const {id, latitude, longitude} = result;
            return {id, latitude, longitude};
        });
    }

    async insert(): Promise<void> {
        if(!this.id) {
            this.id = uuid();
        } else {
            throw new Error('Cannot insert something that is already inserted!');
        }

        await pool.execute("INSERT INTO `ads`(`id`, `name`, `description`, `price`, `url`, `latitude`, `longitude`) VALUES(:id, :name, :description, :price, :url, :latitude, :longitute)", this);
    }
}