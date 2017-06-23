import React, { Component } from 'react';

class AddToFavouritesButton extends Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(event) {
        event.preventDefault();
        this.props.handleAddToFavourites(this.props.joke);
    }

    render() {
        return (
            <button className="add-favourite-joke" onClick={this.handleOnClick}>
                Add to favourites
            </button>
        );
    }
}

export default AddToFavouritesButton;
