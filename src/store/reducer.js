import * as actionTypes from './actions';

const initialState = {
    authenticated: false,
    apiKey: 'd38aa8716411ef7d8e9054b34a6678ac',
    numberOfGenres: 3,
    genres: [],
    numberOfMoviesPerGenre: 6,
    movies: [],
    selectedRow: 0,
    selectedColumn: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_GENRES:
            return {
                ...state,
                genres: action.genres
            }
        case actionTypes.STORE_MOVIES:
            return {
                ...state,
                movies: [...state.movies, action.moviesByGenre]
            }     
        case actionTypes.SET_AUTHENTICATION:
            return {
                ...state,
                authenticated: action.authentification
            } 
        default:
            return state;     
    }   

}

export default reducer;