import React, { Component } from 'react';

class LoadRandomJokesForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleRequestForRandomJokes();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>Press the button to load new random jokes.</p>
                <input type="submit" value="Show 10 random jokes" />
            </form>
        );
    }
}

export default LoadRandomJokesForm;
