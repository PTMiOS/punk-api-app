import superagent from 'superagent';
import { Beer } from '../models/beer';

export default class PunkApiClient {
    GetBeers = async (page: number = 1, pageSize: number = 80): Promise<Beer[]> => {
        let result:Beer[] = [];

        try {
            let retryLeft = 3;

            let success = async (response:superagent.Response): Promise<Beer[]> =>{
                result = response.body;
                return result;
            };

            let failure = async (reason:string): Promise<never> => {
                throw new Error(reason);
            };

            let retry = async (reason:string): Promise<void> => {
                retryLeft--;
                await apiCall();
            }

            let apiCall = async (): Promise<void> => {
                if (retryLeft <= 0)
                    throw new Error("Aborting request due to exceeding retry limit.");

                let url:string = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${pageSize}`;
    
                await superagent
                    .get(url)
                    .then(await success, await retry)
                    .catch(await failure);
            }
            
            await apiCall();
        }
        catch (e){
            console.log(e);
        }

        return result;
    };

    GetAllBeers = async (): Promise<Beer[]> => {
        let allBeers: Beer[] = [];
        let maxPageSize = 80;
        let pageCount = 1;
        let actualBeers: Beer[] = [];

        do {
            actualBeers = await this.GetBeers(pageCount++, maxPageSize);
            allBeers = allBeers.concat(actualBeers);
        } while(actualBeers.length !== 0)
        
        return allBeers;
    }
}