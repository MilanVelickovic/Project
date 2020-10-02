import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actionTypes from '../../store/actions';

import GenreSlider from '../../components/GenreSlider/GenreSlider';

import classes from './Home.module.css';

class Home extends Component {

    state = {
        selectedRow: 0,
        selectedColumn: 0
    }

    componentDidMount() {
        this.loadGenresHandler();
        document.addEventListener("keydown", this.selectedMovieHandler);
    }

    selectedMovieHandler = (event) => {
        let row = this.state.selectedRow;
        let column = this.state.selectedColumn;
        switch (event.keyCode) {
            case 37:
                if (column > 0) {
                    column--;
                } else {
                    column = this.props.numberOfMoviesPerGenre - 1;
                }
                break;
            case 40:
                if (row < this.props.numberOfGenres - 1) {
                    row++;
                } else {
                    row = 0;
                }
                break;
            case 39:
                if (column < this.props.numberOfMoviesPerGenre - 1) {
                    column++;
                } else {
                    column = 0;
                }
                break;
            case 38:
                if (row > 0) {
                    row--;
                } else {
                    row = this.props.numberOfGenres - 1;
                }
                break;
            default:
                break;                
        }
        this.setState({
            selectedRow: row,
            selectedColumn: column
        })
    }

    loadGenresHandler = () => {
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${this.props.apiKey}&language=en-US`)
            .then(response => this.props.storeGenres(response.data.genres.slice(0, this.props.numberOfGenres)));
    }

    render () {
        return (
            <div className={classes.Home}>
                {this.props.genres.map(genre => {
                    return <GenreSlider key={genre.id} id={genre.id} genre={genre.name} selectedRow={this.state.selectedRow} selectedColumn={this.state.selectedColumn}/>;
                })}
            </div>
        );
        
    }
}

const dataFromStore = state => {
    return {
        apiKey: state.apiKey,
        numberOfGenres: state.numberOfGenres,
        numberOfMoviesPerGenre: state.numberOfMoviesPerGenre,
        genres: state.genres
    }
}

const dispatching = dispatch => {
    return {
        storeGenres: (genresArray) => dispatch({
            type: actionTypes.STORE_GENRES,
            genres: genresArray
        })
    }
}

export default connect(dataFromStore, dispatching)(Home);
