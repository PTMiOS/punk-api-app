import React from "react";
import { Modal, Segment } from "semantic-ui-react";
import { Beer } from "../models/beer";
import { BeerItem } from "./beer-item";

interface FavoritesListProps {
    triggerModal:any;
    favorites:Beer[];
    addOrRemoveFavorites:Function;
}

interface FavoritesListState {}

export default class FavoritesList extends React.Component<FavoritesListProps, FavoritesListState> {

    render () {
        let addOrRemoveFavorites = this.props.addOrRemoveFavorites;
        let content:any;

        if (this.props.favorites.length > 0) {
            content = this.props.favorites.map(function(beer: Beer, index) {
                return <BeerItem key={beer.id} beer={beer} addOrRemoveFavorites={addOrRemoveFavorites} favorites={[]}/>;
            })
        }else{
            content = <Segment textAlign="center">No favorites yet  :(</Segment>
        }

        return  <Modal trigger={this.props.triggerModal}>
                    <Modal.Header>Favorites</Modal.Header>
                    <Modal.Content>
                        { content }
                    </Modal.Content>
                </Modal>
    }
}