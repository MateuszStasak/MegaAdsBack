import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";
import {AdEntity} from "../types";

const defaultObj = {
    name: 'Test Name',
    description: 'blah',
    url: 'https://example.com',
    price: 0,
    latitude: 9,
    longitude: 9,
}

afterAll(async () => {
    await pool.end();
});

// ------------- getOne method ------------------------------------------------------

test('AdRecord.getOne returns data from database for one entry.', async () => {
    const ad = await AdRecord.getOne('1');
    expect(ad).toBeDefined();
    expect(ad.id).toBe('1');
    expect(ad.name).toBe('Test');
    expect(ad.description).toBe('Test');
    expect(ad.latitude).toBe(90.0000000);
    expect(ad.longitude).toBe(90.0000000);
});


test('AdRecord.getOne returns null from database for nonexistent entry', async () => {
    const ad = await AdRecord.getOne('---');
    expect(ad).toBeNull();
});

// ------------- findAll method ------------------------------------------------------

test('AdRecord.findAll returns array of found entries.', async () => {
    const ads = await AdRecord.findAll('');
    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns array of found entries when searching for "e".', async () => {
    const ads = await AdRecord.findAll('e');
    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
});

test('AdRecord.findAll returns empty array when searching for something does not exist.', async () => {
    const ads = await AdRecord.findAll('--------------');
    expect(ads).toEqual([]);
});

test('AdRecord.findAll returns smaller (expected by the client) amount of data from database.', async () => {
    const ads = await AdRecord.findAll('');
    expect((ads[0] as AdEntity).price).toBeDefined();
    expect((ads[0] as AdEntity).description).toBeUndefined();
});

// ------------- insert method ------------------------------------------------------

test('AdRecord.insert returns new UUID.', async () => {
    const ad = new AdRecord(defaultObj);
    await ad.insert();
    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
});

test('AdRecord.insert inserts data to database.', async () => {
    const ad = new AdRecord(defaultObj);
    await ad.insert();
    const foundAd = await AdRecord.getOne(ad.id);
    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);
});


