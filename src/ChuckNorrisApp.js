import React, { Component } from 'react';
import FavouriteJokesList from './view/FavouriteJokesList';
import RandomJokesList from './view/RandomJokesList';

class ChuckNorrisApp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addFavouriteJoke: false,
            removeFavouriteJoke: false,
            randomJokes: false
        };

        this.favouriteJokes = new Map();
        this.randomJokes = new Map();
        this.maximumFavouriteJokesAllowed = 10;


        // Check for locally stored favourite jokes
        this.localStorageKey = 'myFavouriteChuckNorrisJokes';
        if (localStorage.getItem(this.localStorageKey)) {
            this.favouriteJokes = new Map(JSON.parse(localStorage.getItem(this.localStorageKey)));
        }

        this.getRandomJokesFromApi = this.getRandomJokesFromApi.bind(this);
        this.handleAddToFavourites = this.handleAddToFavourites.bind(this);
        this.handleRemoveFromFavourites = this.handleRemoveFromFavourites.bind(this);
    }

    getRandomJokesFromApi() {
        const favouriteJokes = this.favouriteJokes;
        const randomJokesApiUrl = 'http://api.icndb.com/jokes/random/10?escape=javascript';

        return fetch(randomJokesApiUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                let jokes = new Map();
                responseJson.value.forEach(function(joke) {
                    let isFavourite = false;
                    if (favouriteJokes.get(joke.id)) {
                        isFavourite = true;
                    }
                    jokes.set(joke.id, {
                        id: joke.id,
                        text: joke.joke,
                        isFavourite: isFavourite
                    });
                });
                this.setState({
                    randomJokes: jokes
                });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleAddToFavourites(joke) {
        // Prevent adding a new favourite joke when the limit is reached
        if (this.favouriteJokes.size >= this.maximumFavouriteJokesAllowed) {
            alert(`You are not allowed to have more than ${this.maximumFavouriteJokesAllowed} favourite jokes!`);
            return;
        }

        // Set new favourite flag (to update current lists)
        joke.isFavourite = true;

        // Now save it to local storage
        this.favouriteJokes.set(joke.id, joke);
        localStorage.setItem(this.localStorageKey, JSON.stringify(Array.from(this.favouriteJokes.entries())));

        // Set state to update the lists
        this.setState({
            addFavouriteJoke: joke.id,
            removeFavouriteJoke: false
        });
    }

    handleRemoveFromFavourites(joke) {
        // Set new favourite flag (to update current lists)
        joke.isFavourite = false;

        // Now remove it from local storage
        this.favouriteJokes.delete(joke.id);
        localStorage.setItem(this.localStorageKey, JSON.stringify(Array.from(this.favouriteJokes.entries())));

        // Set state to update the lists
        this.setState({
            addFavouriteJoke: false,
            removeFavouriteJoke: joke.id
        });
    }

    render() {
        if (this.state.randomJokes !== false) {
            this.randomJokes = this.state.randomJokes;
        }

        return (
            <div>
                <RandomJokesList
                    jokes={this.randomJokes}
                    favouriteJokes={this.favouriteJokes}
                    getRandomJokesFromApi={this.getRandomJokesFromApi}
                    handleAddToFavourites={this.handleAddToFavourites}
                    addFavouriteJoke={this.state.addFavouriteJoke}
                    removeFavouriteJoke={this.state.removeFavouriteJoke}
                />
                <FavouriteJokesList
                    favouriteJokes={this.favouriteJokes}
                    handleRemoveFromFavourites={this.handleRemoveFromFavourites}
                />
            </div>
        );
    }
}

export default ChuckNorrisApp;
