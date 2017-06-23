import React, { Component } from 'react';
import AddToFavouritesButton from './AddToFavouritesButton';
import RemoveFromFavouritesButton from './RemoveFromFavouritesButton';

class JokeListItem extends Component {
    render() {
        let addToFavouritesButton;
        if ( ! this.props.joke.isFavourite && this.props.handleAddToFavourites) {
            addToFavouritesButton = <AddToFavouritesButton
                joke={this.props.joke}
                handleAddToFavourites={this.props.handleAddToFavourites}
            />;
        }

        let removeFromFavouritesButton;
        if (this.props.joke.isFavourite && this.props.handleRemoveFromFavourites) {
            removeFromFavouritesButton = <RemoveFromFavouritesButton
                joke={this.props.joke}
                handleRemoveFromFavourites={this.props.handleRemoveFromFavourites}
            />;
        }

        return (
            <li>
                {this.props.joke.text}
                {addToFavouritesButton}
                {removeFromFavouritesButton}
            </li>
        );
    }
}

export default JokeListItem;
