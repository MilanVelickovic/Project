import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import * as actionTypes from '../../store/actions';

import MovieThumbnail from './MovieThumbnail/MovieThumbnail';

import classes from './GenreSlider.module.css';

class GenreSlider extends Component {

    componentDidMount() {
        this.loadMoviesHandler();  
    }

    loadMoviesHandler() {
        axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${this.props.id}&api_key=${this.props.apiKey}`)
            .then(response => {
                let moviesByGenre = {
                genre: this.props.genre,
                movies: response.data.results.slice(0, this.props.numberOfMoviesPerGenre)
            }
            this.props.storeMovies(moviesByGenre);  
        });
    }

    findIndexOfGenre = (genreName) => {     
        return this.props.genres.map(element => {
            return element.name;
        }).indexOf(genreName);
    }

    findIndexOfMovie = (genreIndex, movieTitle) => {
        return this.props.movies[genreIndex].movies.map(element => {
            return element.title;
        }).indexOf(movieTitle);
    }

    render () {
        let moviesContent = null;
        if (this.props.movies.length !== this.props.numberOfGenres - 1) {
            moviesContent = this.props.movies.map(genre => {
                if (genre.genre === this.props.genre) {
                    let genreIndex = this.findIndexOfGenre(genre.genre);
                    return [...genre.movies].map(movie => {
                        const details = {
                            title: movie.title,
                            thumbnail: movie.poster_path,
                            image: movie.backdrop_path,
                            vote: movie.vote_average,
                            overview: movie.overview,
                            releaseDate: movie.release_date
                        }
                        return <MovieThumbnail 
                                    key={movie.id}
                                    details={details}
                                    row={genreIndex} 
                                    selectedRow={this.props.selectedRow}
                                    column={this.findIndexOfMovie(genreIndex, movie.title)}
                                    selectedColumn={this.props.selectedColumn}/>
                    });
                }
            });
        }
        return (
            <div className={classes.GenreSlider}>
                <p>{this.props.genre}</p>
                <div className={classes.movies}>
                    {moviesContent}
                </div>
            </div>
        );
    }
};

const dataFromStore = state => {
    return {
        apiKey: state.apiKey,
        genres: state.genres,
        numberOfGenres: state.numberOfGenres,
        numberOfMoviesPerGenre: state.numberOfMoviesPerGenre,
        movies: state.movies
    }
}

const dispatching = dispatch => {
    return {
        storeMovies: (moviesByGenre) => dispatch({
            type: actionTypes.STORE_MOVIES, 
            moviesByGenre: moviesByGenre
        })
    }
}

export default connect(dataFromStore, dispatching)(GenreSlider);