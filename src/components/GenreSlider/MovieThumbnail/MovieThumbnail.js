import React, { Component } from 'react';

import Popup from '../../UI/Popup/Popup';

import classes from './MovieThumbnail.module.css';

class MovieThumbnail extends Component {

    state = {
        showPopup: false
    }

    openMovieDetailsHandler = (event) => {
        if (event.keyCode === 13) {
            this.setState({
                showPopup: true
            })
        }
        if (event.keyCode === 27) {
            this.setState({
                showPopup: false
            })
        }
    }

    render () {
        let attachedClasses = [classes.MovieThumbnail];
        let popup = null;

        if (this.props.row === this.props.selectedRow &&
            this.props.column === this.props.selectedColumn) {
            attachedClasses.push(classes.selected);
            document.addEventListener("keydown", this.openMovieDetailsHandler);
        } else {
            document.removeEventListener("keydown", this.openMovieDetailsHandler);
        }

        if (this.state.showPopup) {
            popup = <Popup movieDetails={this.props.details}/>;
        }

        return (
            <div className={attachedClasses.join(' ')}>
                <img src={`https://image.tmdb.org/t/p/w500${this.props.details.thumbnail}`} alt={this.props.details.title}/>
                {popup}
            </div>
        );
    }
};

export default MovieThumbnail;