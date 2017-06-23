import React, { Component } from 'react';

class RemoveFromFavouritesButton extends Component {
    constructor(props) {
        super(props);

        this.handleOnClick = this.handleOnClick.bind(this);
    }

    handleOnClick(event) {
        event.preventDefault();
        this.props.handleRemoveFromFavourites(this.props.joke);
    }

    render() {
        return (
            <button className="remove-favourite-joke" onClick={this.handleOnClick}>
                Remove from favourites
            </button>
        );
    }
}

export default RemoveFromFavouritesButton;
