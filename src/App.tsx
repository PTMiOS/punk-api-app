import React from 'react';
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import 'semantic-ui-less/semantic.less';
import PunkApiClient from './services/punk-api-client';
import Main from './components/main';
import { Beer } from './models/beer';
import { Loader } from 'semantic-ui-react';
import FavoritesRepository from './services/favorites-repository';

interface AppProps {}

interface AppState {
  isLoading: boolean;
  beers:Beer[];
  displayedBeers:Beer[];
  searchText:string;
  sortingBy:string;
  favorites:number[];
}

export default class App extends React.Component<AppProps, AppState> {
    state: AppState = {
      isLoading: true,
      beers: [],
      displayedBeers: [],
      searchText: "",
      sortingBy: "name",
      favorites: []
    }
    
    query = (input:string) => {
      let newBeers = (!input) ?
        this.state.beers :
        this.state.beers.filter((beer:Beer) => {
          return beer.name.toLowerCase().includes(input.toLowerCase()) || 
                  beer.description.toLowerCase().includes(input.toLowerCase()) ||
                  beer.food_pairing.filter(
                    (food:string) => {return food.toLowerCase().includes(input.toLowerCase())})
                    .length > 0;
        });
        newBeers = this.doSort(newBeers);
      this.setState({
        displayedBeers: newBeers,
        searchText: input
      })
    }

    sorting_UpdateOrder = () => {
      let newBeers = this.state.displayedBeers.reverse();
      this.setState({
        displayedBeers: newBeers
      })
    }

    sorting_UpdateSorting = (value: string) => {
      let newBeers = this.doSort([]);
      this.setState({
        sortingBy: value,
        displayedBeers: newBeers
      })
    }

    doSort(beers:Beer[]): Beer[] {
      var beersToSort = (beers && beers.length > 0) ? beers : this.state.displayedBeers;
      let newBeers = beersToSort.sort((a:Beer, b:Beer):number => {
        return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      });
      return newBeers;
    }

    addOrRemoveFavorites = (id:number) => {
      let newFavorites: number[] = [];
      let favoritesRepository = new FavoritesRepository();
      let currentFavorites = favoritesRepository.getFavorites();

      if (currentFavorites.includes(id)) {
        newFavorites = currentFavorites.filter((value) =>{
          return value !== id;
        });
      }else{
        newFavorites = currentFavorites.concat([id]);
      }

      favoritesRepository.saveFavorites(newFavorites);

      this.setState({
        favorites: newFavorites
      });
    };

    getFavoritesFromStore = ():number[] => {
      let currentFavoritesItem = localStorage.getItem("favorites");
      let currentFavorites:number[] = currentFavoritesItem ? 
        JSON.parse(currentFavoritesItem) :
        this.state.favorites;
      return currentFavorites;
    }

    componentWillMount() {
      let client = new PunkApiClient();
      let favorites = this.getFavoritesFromStore();
      client.GetAllBeers().then(fetchedBeers => {
        this.setState({
          isLoading: false,
          beers: fetchedBeers,
          displayedBeers: fetchedBeers,
          favorites: favorites
        })
      });
    }

    render() {
      let beers = this.state.displayedBeers;
      if (!this.state.isLoading){
        return <Main
                  beers={beers} 
                  query={this.query} 
                  sorting_UpdateOrder={this.sorting_UpdateOrder} 
                  sorting_UpdateSorting={this.sorting_UpdateSorting}
                  addOrRemoveFavorites={this.addOrRemoveFavorites}
                  favorites={this.state.favorites}
                  favoriteBeers={this.state.beers.filter(beer => this.state.favorites.includes(beer.id))} />
      }else{
        return <Loader active={true} content={"Loading..."} />
      }
    };
}
