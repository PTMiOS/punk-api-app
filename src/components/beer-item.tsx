import React from 'react';
import { Beer } from '../models/beer';
import { Image, Label, Card, Button } from 'semantic-ui-react'
import './beer-item.css';


interface BeerItemProps {
    beer: Beer;
    addOrRemoveFavorites: Function;
    favorites:number[];
}

interface BeerItemState {}

export class BeerItem extends React.Component<BeerItemProps, BeerItemState> {
    
    addOrRemoveFavorite = () => {
        this.props.addOrRemoveFavorites.call(this.props.addOrRemoveFavorites, this.props.beer.id);
    }

    favoriteIcon = ():string => {
        if (this.props.favorites.includes(this.props.beer.id)) {
            return "heart";
        }else{
            return "heart outline";
        }
    }

    render() {
        let beer = this.props.beer;
        var foodPairings = beer.food_pairing.map(function(food: string, index){
            return <Label key={index}>{food}</Label>;
          })
        return (
            <Card fluid >

                <Card.Content>
                    <Button icon={this.favoriteIcon()} size={"medium"} className="right floated" onClick={this.addOrRemoveFavorite} />
                    <div className="imagewrapper">
                        <Image src={beer.image_url !== null ? beer.image_url : '/dummy-image.png'} />
                    </div>
                    <div className="floated">
                    <Card.Header as='h2'>{beer.name}</Card.Header>
                    <Card.Meta>{beer.tagline}</Card.Meta>
                    <Card.Description as='p'>{beer.description}</Card.Description>
                    <Card.Description as='p'><b>Brewer's tips: </b>{beer.brewers_tips}</Card.Description>
                    </div>
                </Card.Content>
                <Card.Content>
                    <Label.Group size="medium">
                    <Label pointing="right">Recommended with: </Label>
                        {foodPairings}
                    </Label.Group>
                </Card.Content>
                <Card.Content extra>
                    <Label.Group circular color="grey">
                        <Label content={`ABV ${beer.abv}`} />
                        <Label content={`IBU ${beer.ibu}`}/>
                        <Label content={`SRM ${beer.srm}`}/>
                        <Label content={`EBC ${beer.ebc}`}/>
                        <Label content={`PH ${beer.ph}`}/>
                        <Label content={`First brewed in ${beer.first_brewed}`} className="right floated"/>
                    </Label.Group>
                </Card.Content>
            </Card>
        )
    }
}