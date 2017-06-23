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
        this.localStorageKey = 'myFavouriteChuckNorrisJokes';
        this.maximumFavouriteJokesAllowed = 3;

        // Check for locally stored favourite jokes
        if (localStorage.getItem(this.localStorageKey)) {
            this.favouriteJokes = new Map(JSON.parse(localStorage.getItem(this.localStorageKey)));
        }

        this.handleAddToFavourites = this.handleAddToFavourites.bind(this);
        this.handleRemoveFromFavourites = this.handleRemoveFromFavourites.bind(this);
    }

    handleAddToFavourites(joke) {
        // Prevent adding a new favourite joke when the limit is reached
        if (this.favouriteJokes.size >= this.maximumFavouriteJokesAllowed) {
            alert(`You are not allowed to have more than ${this.maximumFavouriteJokesAllowed} favourite jokes!`);
            return;
        }

        // Mark the joke as favourite, and save it to local storage
        joke.isFavourite = true;
        this.favouriteJokes.set(joke.id, joke);
        localStorage.setItem(this.localStorageKey, JSON.stringify(Array.from(this.favouriteJokes.entries())));

        // Set state to update the lists
        this.setState({
            addFavouriteJoke: joke.id,
            removeFavouriteJoke: false
        });
    }

    handleRemoveFromFavourites(joke) {
        // This joke is no longer a favourite, and should be removed from local storage
        this.favouriteJokes.delete(joke.id);
        localStorage.setItem(this.localStorageKey, JSON.stringify(Array.from(this.favouriteJokes.entries())));

        // Set state to update the lists
        this.setState({
            addFavouriteJoke: false,
            removeFavouriteJoke: joke.id
        });
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
