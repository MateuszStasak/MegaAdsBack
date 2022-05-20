import {AdRecord} from "../records/ad.record";

const defaultObj = {
    name: 'Test Name',
    description: 'blah',
    url: 'https://example.com',
    price: 0,
    latitude: 9,
    longitude: 9,
}

test('Can build AdRecord', () => {
    const ad = new AdRecord({
        ...defaultObj,
    });

    expect(ad.name).toBe('Test Name');
    expect(ad.description).toBe('blah');
    expect(ad.url).toBe('https://example.com');
    expect(ad.price).toBe(0);
    expect(ad.latitude).toBe(9);
    expect(ad.longitude).toBe(9);

});

test('Validates invalid price', () => {
    expect(() => new AdRecord({
            ...defaultObj,
            price: -3,
    })).toThrow('Cena nie może być mniejsza niż 0 lub większa niż 9 999 999.')
});