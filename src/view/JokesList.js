import React, { Component } from 'react';
import JokeListItem from './JokeListItem';

class JokesList extends Component {
    render() {
        let listItems = [];
        const handleAddToFavourites = this.props.handleAddToFavourites;
        const handleRemoveFromFavourites = this.props.handleRemoveFromFavourites;

        this.props.jokes.forEach(function(joke) {
            listItems.push(
                <JokeListItem
                    joke={joke}
                    key={joke.id}
                    handleAddToFavourites={handleAddToFavourites}
                    handleRemoveFromFavourites={handleRemoveFromFavourites}
                />
            );
        });

        // When no list items are found, show a hint to press the button
        if (listItems.length === 0) {
            return (
                <p>This list contains 0 jokes.</p>
            );
        }

        return (
            <ul>
                {listItems}
            </ul>
        );
    }
}

export default JokesList;
