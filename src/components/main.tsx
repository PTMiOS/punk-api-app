import React from 'react';
import { Beer } from '../models/beer';
import BeerList from './beer-list';
import HeaderBar from './header-bar';
import { Segment } from 'semantic-ui-react';

interface MainProps {
    beers: Beer[];
    query: Function;
    sorting_UpdateOrder: Function;
    sorting_UpdateSorting: Function;
    addOrRemoveFavorites: Function;
    favorites:number[];
    favoriteBeers: Beer[];
}

interface MainState {}

export default class Main extends React.Component<MainProps, MainState> {

    content = () => {
        if (this.props.beers.length > 0){
            return <BeerList
                        beers={this.props.beers}
                        addOrRemoveFavorites={this.props.addOrRemoveFavorites}
                        favorites={this.props.favorites} />
        }else{
            return <Segment textAlign="center">No result for the given criteria.</Segment>
        }
    }

    render() {
        return  <div>
                    <HeaderBar 
                        query={this.props.query}
                        sorting_UpdateSorting={this.props.sorting_UpdateSorting} 
                        sorting_UpdateOrder={this.props.sorting_UpdateOrder}
                        favorites={this.props.favoriteBeers} />
                    { this.content() }
                </div>
    }
}