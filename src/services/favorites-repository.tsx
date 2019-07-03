const repositoryName = "favorites";

export default class FavoritesRepository {
    saveFavorites = (favorites:number[]) => {
        let localStorageValue = JSON.stringify(favorites);
        localStorage.setItem(repositoryName, localStorageValue);
    };

    getFavorites = () => {
        let favoritesStoreItem = localStorage.getItem("favorites");

        if (favoritesStoreItem){
            let favorites:number[] = JSON.parse(favoritesStoreItem)
            return favorites;
        }else{
            throw new Error("Error during accessing favorites store.")
        }
    };
}