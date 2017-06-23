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
                <input type="submit" value="Show 10 random jokes" />
            </form>
        );
    }
}

export default LoadRandomJokesForm;
