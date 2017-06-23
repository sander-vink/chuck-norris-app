import React, { Component } from 'react';
import RandomJokesList from './view/RandomJokesList';

class ChuckNorrisApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addFavouriteJoke: false,
            removeFavouriteJoke: false
        };

        this.favouriteJokes = new Map();

        this.handleAddToFavourites = this.handleAddToFavourites.bind(this);
        this.handleRemoveFromFavourites = this.handleRemoveFromFavourites.bind(this);
    }

    handleAddToFavourites(joke) {
        alert('Todo - Add favourite joke!');
    }

    handleRemoveFromFavourites(joke) {
        alert('Todo - Remove favourite joke!');
    }

    render() {
        return (
            <div className="randomJokes">
                <RandomJokesList
                    favouriteJokes={this.favouriteJokes}
                    handleAddToFavourites={this.handleAddToFavourites}
                    addFavouriteJoke={this.state.addFavouriteJoke}
                    removeFavouriteJoke={this.state.removeFavouriteJoke}
                />
            </div>
        );
    }
}

export default ChuckNorrisApp;
