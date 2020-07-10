import filmAPI from "../api/film-api";
import { getAllData } from '../functions/navbar-functions';
const UPDATE_FILMS = "UPDATE_FILMS";
const UPDATE_FILMS_TITLE = "UPDATE_FILMS_TITLE";
const UPDATE_SEARCH_FILM = "UPDATE_SEARCH_FILM";
const UPDATE_MOVIE_DETAILS = "UPDATE_MOVIE_DETAILS";
const UPDATE_ACTIVE_ID = "UPDATE_ACTIVE_ID";
const UPDATE_PRELOADER = "UPDATE_PRELOADER";

const initState = {
    films:[],
    listFilmsTitle:[],
    searchFilm: null,
    movieDetails: [],
    activeId: null,
    preloader: false
}

const filmReducer = (state = initState, action) => {
    switch(action.type) {
        case UPDATE_FILMS:
            return {
                ...state,
                films: action.films
            }
        case UPDATE_FILMS_TITLE:
            return {
                ...state,
                listFilmsTitle: action.listFilmsTitle
            }
        case UPDATE_SEARCH_FILM:
            return {
                ...state,
                searchFilm: action.searchFilm
            }    
        case UPDATE_MOVIE_DETAILS:
            return {
                ...state,
                movieDetails: action.movieDetails
            }    
        case UPDATE_ACTIVE_ID:
            return {
                ...state,
                activeId: action.activeId
            }    
        case UPDATE_PRELOADER:
            return {
                ...state,
                preloader: action.preloader
            }    
        default:
            return state
    }
}

export const updateFilmsAC = (films) => ({ type:UPDATE_FILMS, films })
const updateFilmsTitleAC = (listFilmsTitle) => ({ type:UPDATE_FILMS_TITLE, listFilmsTitle })
export const updateSearchFilmsAC = (searchFilm) => ({ type:UPDATE_SEARCH_FILM, searchFilm })
const updateMovieDetailsAC = (movieDetails) =>({ type:UPDATE_MOVIE_DETAILS, movieDetails }) 
export const updateActiveIdAC = (activeId) =>({ type:UPDATE_ACTIVE_ID, activeId }) 
export const updatePreloaderAC = (preloader) =>({ type:UPDATE_PRELOADER, preloader }) 

const getAllFilmsTitle = (films) => {
    const filmsTitle = []
    films.forEach(film => {
        filmsTitle.push(film.title)
    });
    return filmsTitle
}

export const getAllFilmsThunk = () => {
    return async (dispatch) => {
        const { data, status } = await filmAPI.getAllFilms()
        if(status === 200) {
            dispatch(updateFilmsAC(data.results))
            const filmsTitle = getAllFilmsTitle(data.results)
            dispatch(updateFilmsTitleAC(filmsTitle))
        }
    }
}

export const getAllDataThunk = (dataFilm) => {
    return async (dispatch) => {
        const result = await getAllData(dataFilm)
        const keys = Object.keys(result)
        for(let i = 0; i < keys.length; i++) {
            for(let j = 0; j < result[keys[i]].length; j++) {
                const data = await getAllData(result[keys[i]][j])
                result[keys[i]][j] = data
            }
        }
        dispatch(updateMovieDetailsAC(result))
        dispatch(updatePreloaderAC(false))    
    }
}



export default filmReducer;