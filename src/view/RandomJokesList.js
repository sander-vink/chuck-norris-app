import React, { Component } from 'react';
import JokesList from './JokesList';
import LoadRandomJokesForm from './LoadRandomJokesForm';

class RandomJokesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomJokes: false
        };

        this.handleRequestForRandomJokes = this.handleRequestForRandomJokes.bind(this);
    }

    handleRequestForRandomJokes() {
        this.props.getRandomJokesFromApi();
    }

    render() {
        return (
            <div className="random-jokes-list">
                <LoadRandomJokesForm
                    handleRequestForRandomJokes={this.handleRequestForRandomJokes}
                />
                <h2>Random jokes</h2>
                <JokesList
                    jokes={this.props.jokes}
                    handleAddToFavourites={this.props.handleAddToFavourites}
                    handleRemoveFromFavourites={this.props.handleRemoveFromFavourites}
                />
            </div>
        );
    }
}

export default RandomJokesList;
