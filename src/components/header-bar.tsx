import React from "react";
import { Segment, Input, Grid, Button } from "semantic-ui-react";
import FavoritesList from "./favorites-list";
import { Beer } from "../models/beer";

interface HeaderBarProps {
    query: Function;
    sorting_UpdateSorting: Function;
    sorting_UpdateOrder: Function;
    favorites: Beer[];
}

interface HeaderBarState {}

export default class HeaderBar extends React.Component<HeaderBarProps, HeaderBarState> {
    throttling:boolean = false;
    throttleLimit_ms:number = 600;

    handleInputChange = (event: any) => {
        let query = this.props.query;
        let search = event.target.value;

        if (!this.throttling) {
            query.call(query, search);
            console.log(this.throttling);
            this.throttling = true;
            setTimeout(() => {
                this.throttling = false;
            }, this.throttleLimit_ms);
        }
    }

    sorting_UpdateSorting = (event: any) => {
        this.props.sorting_UpdateSorting.call(this.props.sorting_UpdateSorting, event.target.value);
    }

    sorting_UpdateOrder = () => {
        this.props.sorting_UpdateOrder.call(this.props.sorting_UpdateOrder);
    }

    render() {
        return  <Segment basic>
                    <Grid columns="5" textAlign="center">
                        <Grid.Row>
                            <Grid.Column width={8} key="search">
                                <Input
                                    fluid
                                    placeholder='Search... (only in names, descriptions, pairing foods yet)'
                                    onChange={event => this.handleInputChange(event)}/>
                            </Grid.Column>
                            <Grid.Column width={4} key="sorting">
                                <Input
                                    fluid
                                    list='sortingBy' 
                                    placeholder='Sort result by...'
                                    onChange={event => this.sorting_UpdateSorting(event)} />
                                <datalist id='sortingBy'>
                                    <option key="name" value='Name' />
                                    <option key="abv" value='ABV' />
                                    <option key="ibu" value='IBU' />
                                    <option key="srm" value='SRM' />
                                    <option key="ebc" value='EBC' />
                                    <option key="ph" value='PH' />
                                    <option key="first_brewed" value='First brewed date' />
                                </datalist>
                            </Grid.Column>
                            <Grid.Column width={3} key="reverse">
                                <Button
                                    fluid 
                                    onClick={() => this.sorting_UpdateOrder()}>
                                        Reverse
                                </Button>
                            </Grid.Column>
                            <Grid.Column width={1} key="favorites">
                                <FavoritesList 
                                    triggerModal={<Button circular icon="star" floated="right" />}
                                    favorites={this.props.favorites}
                                    addOrRemoveFavorites={()=>{}} />
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
    }
}