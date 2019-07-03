import PunkApiClient from '../../services/punk-api-client';
import { Beer } from '../../models/beer';

it("GetBeers: Happy path", async () => {
    let client = new PunkApiClient();
    let result:Beer[] = await client.GetBeers();
    expect(result.length).toBeGreaterThan(0);
})

it("GetAllBeers: Happy path", async () => {
    let maxPageCount = 80;
    let client = new PunkApiClient();
    let result:Beer[] = await client.GetAllBeers();
    expect(result.length).toBeGreaterThan(maxPageCount);
})