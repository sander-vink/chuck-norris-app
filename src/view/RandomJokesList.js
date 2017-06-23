import React, { Component } from 'react';
import JokesList from './JokesList';
import LoadRandomJokesForm from './LoadRandomJokesForm';

class RandomJokesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomJokes: false
        };

        this.jokes = new Map();

        this.getRandomJokesFromApi = this.getRandomJokesFromApi.bind(this);
        this.handleRequestForRandomJokes = this.handleRequestForRandomJokes.bind(this);
        this.render = this.render.bind(this);
    }

    getRandomJokesFromApi() {
        const favouriteJokes = this.props.favouriteJokes;
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

    handleRequestForRandomJokes() {
        this.getRandomJokesFromApi();
    }

    render() {
        if (this.props.removeFavouriteJoke !== false && this.jokes.get(this.props.removeFavouriteJoke)) {
            let modifyJoke = this.jokes.get(this.props.removeFavouriteJoke);
            modifyJoke.isFavourite = false;
            this.jokes.set(this.props.removeFavouriteJoke, modifyJoke);
        }

        if (this.props.addFavouriteJoke !== false && this.jokes.get(this.props.addFavouriteJoke)) {
            let modifyJoke = this.jokes.get(this.props.addFavouriteJoke);
            modifyJoke.isFavourite = true;
            this.jokes.set(this.props.addFavouriteJoke, modifyJoke);
        }

        if (this.state.randomJokes !== false) {
            this.jokes = this.state.randomJokes;
        }

        return (
            <div>
                <LoadRandomJokesForm
                    handleRequestForRandomJokes={this.handleRequestForRandomJokes}
                />
                <h2>Random jokes</h2>
                <JokesList
                    jokes={this.jokes}
                    handleAddToFavourites={this.props.handleAddToFavourites}
                    handleRemoveFromFavourites={this.props.handleRemoveFromFavourites}
                />
            </div>
        );
    }
}

export default RandomJokesList;
