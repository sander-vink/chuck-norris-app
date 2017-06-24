import React, { Component } from 'react';
import JokesList from './JokesList';
import PopulateFavouritesForm from './PopulateFavouritesForm';

class FavouriteJokesList extends Component {
    render() {
        return (
            <div className="favourite-jokes-list">
                <PopulateFavouritesForm
                    handleRequestToPopulateFavourites={this.props.handleRequestToPopulateFavourites}
                />
                <h2>My favourite jokes</h2>
                <JokesList jokes={this.props.favouriteJokes} handleRemoveFromFavourites={this.props.handleRemoveFromFavourites} />
            </div>
        );
    }
}

export default FavouriteJokesList;
