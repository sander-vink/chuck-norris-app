import React, { Component } from 'react';
import JokesList from './JokesList';

class FavouriteJokesList extends Component {
    render() {
        return (
            <div className="favourite-jokes-list">
                <h2>My favourite jokes</h2>
                <JokesList jokes={this.props.favouriteJokes} handleRemoveFromFavourites={this.props.handleRemoveFromFavourites} />
            </div>
        );
    }
}

export default FavouriteJokesList;
