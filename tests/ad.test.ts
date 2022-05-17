import {AdRecord} from "../records/ad.record";

test('AdRecord returns data from database for one entry.', async () => {
    const ad = await AdRecord.getOne('1');
    expect(ad).toBeDefined();
    expect(ad.id).toBe('1');
    expect(ad.name).toBe('Test');
    expect(ad.description).toBe('Test');
    expect(ad.latitude).toBe(90.0000000);
    expect(ad.longitude).toBe(90.0000000);
});


test('AdRecord returns null from database for nonexistent entry', async () => {
    const ad = await AdRecord.getOne('---');
    expect(ad).toBeNull();
});