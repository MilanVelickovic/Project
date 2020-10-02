import React from 'react';

import classes from './Popup.module.css';

const Popup = (props) => (
    <div className={classes.Popup}>
        <div className={classes.movie}>
            <img src={`https://image.tmdb.org/t/p/w500${props.movieDetails.image}`} alt={props.movieDetails.title}/>
            <div className={classes.details}>
                <h1>{props.movieDetails.title}</h1>
                <h2>Overview: </h2>
                <p>{props.movieDetails.overview}</p>
                <h2>Vote average: {props.movieDetails.vote}</h2>
            </div>
        </div>
    </div>
);

export default Popup;