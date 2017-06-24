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

        this.addFavouriteJokeFromApi = this.addFavouriteJokeFromApi.bind(this);
        this.getRandomJokesFromApi = this.getRandomJokesFromApi.bind(this);
        this.handleAddToFavourites = this.handleAddToFavourites.bind(this);
        this.handleRemoveFromFavourites = this.handleRemoveFromFavourites.bind(this);
        this.handleRequestToPopulateFavourites = this.handleRequestToPopulateFavourites.bind(this);
    }

    addFavouriteJokeFromApi() {
        // Clear the interval when the limit is reached
        if (this.favouriteJokes.size >= this.maximumFavouriteJokesAllowed && this.addRandomJokeInterval) {
            clearInterval(this.addRandomJokeInterval);
            this.addRandomJokeInterval = false;
            return;
        }

        const favouriteJokes = this.favouriteJokes;
        const randomJokeApiUrl = 'http://api.icndb.com/jokes/random/1?escape=javascript';

        return fetch(randomJokeApiUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                const randomJoke = responseJson.value[0];
                // If this joke is already a favourite joke, try again
                if (favouriteJokes.get(randomJoke.id)) {
                    this.addFavouriteJokeFromApi();
                    return;
                }
                this.handleAddToFavourites({
                    id: randomJoke.id,
                    text: randomJoke.joke,
                    isFavourite: true
                });
            })
            .catch((error) => {
                console.error(error);
            });
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

    handleRequestToPopulateFavourites() {
        // Show a message when the limit is reached
        if (this.favouriteJokes.size >= this.maximumFavouriteJokesAllowed) {
            alert(`You have already reached the maximum of ${this.maximumFavouriteJokesAllowed} favourite jokes!`);
            return;
        }

        // If this request is done, and the timer is already running, stop the timer
        if (this.addRandomJokeInterval) {
            clearInterval(this.addRandomJokeInterval);
            this.addRandomJokeInterval = false;
            alert('You have manually stopped populating the favourite jokes list.');
            return;
        }

        // Initially add a single joke
        this.addFavouriteJokeFromApi();

        // Now start the interval to add another one after 5 seconds
        this.addRandomJokeInterval = setInterval(
            () => this.addFavouriteJokeFromApi(),
            5000
        );
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
                <hr />
                <FavouriteJokesList
                    favouriteJokes={this.favouriteJokes}
                    handleRemoveFromFavourites={this.handleRemoveFromFavourites}
                    handleRequestToPopulateFavourites={this.handleRequestToPopulateFavourites}
                />
            </div>
        );
    }
}

export default ChuckNorrisApp;
