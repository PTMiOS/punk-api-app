import React from 'react';
import { Beer } from '../models/beer';
import { BeerItem } from './beer-item';
import { Item } from 'semantic-ui-react';

interface BeerListProps {
    beers: Beer[];
    addOrRemoveFavorites: Function;
    favorites:number[];
}

interface BeerListState {}

export default class BeerList extends React.Component<BeerListProps, BeerListState> {

    render() {
        let addOrRemoveFavorites = this.props.addOrRemoveFavorites;
        let favorites = this.props.favorites;

        let beerList = this.props.beers.map(function(beer: Beer, index) {
            return <BeerItem key={beer.id} beer={beer} addOrRemoveFavorites={addOrRemoveFavorites} favorites={favorites}/>;
        })
        
        return  <Item.Group divided>
                    { beerList }
                </Item.Group>
    }
}