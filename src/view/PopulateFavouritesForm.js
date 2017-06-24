import React, { Component } from 'react';

class PopulateFavouritesForm extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.handleRequestToPopulateFavourites();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <p>Press the button to populate the list of favourite jokes with a selection of random jokes until the limit is reached.</p>
                <input type="submit" value="Populate favourites" />
            </form>
        );
    }
}

export default PopulateFavouritesForm;
