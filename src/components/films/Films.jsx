import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllFilmsThunk, getAllDataThunk, updateActiveIdAC, updatePreloaderAC } from '../../redux/film-reducer'
import FilmDAta from './FilmData';
import '../components-style.css';
import Preloader from '../Preloader';

const Films = ({ getAllFilmsThunk, 
    films, searchFilm, getAllDataThunk, 
    movieDetails, activeId, updateActiveIdAC,
    preloader, updatePreloaderAC }) => {
    useEffect(()=>{
        getAllFilmsThunk()
    }, [])
    const getSearchFilm = films.find((film)=> film.title === searchFilm)
    const listFilms = films.map((film, id)=> {
        if(!getSearchFilm){
            if(film.episode_id === activeId) {
                return <FilmDAta 
                    movieDetails={movieDetails} 
                    film={film} 
                    getAllDataThunk={getAllDataThunk}
                    updateActiveIdAC={updateActiveIdAC}
                    updatePreloaderAC={updatePreloaderAC}
                    />
            } else {
                return <FilmDAta 
                    film={film} 
                    getAllDataThunk={getAllDataThunk}
                    updateActiveIdAC={updateActiveIdAC}
                    updatePreloaderAC={updatePreloaderAC}
                    />
            }  
        } else {
            if(film.title === getSearchFilm.title){
                if(film.episode_id === activeId) {
                    return <FilmDAta 
                        movieDetails={movieDetails} 
                        film={film} 
                        getAllDataThunk={getAllDataThunk}
                        updateActiveIdAC={updateActiveIdAC}
                        updatePreloaderAC={updatePreloaderAC}
                        />
                } else {
                    return <FilmDAta 
                        film={film} 
                        getAllDataThunk={getAllDataThunk}
                        updateActiveIdAC={updateActiveIdAC}
                        updatePreloaderAC={updatePreloaderAC}
                        />
                }  
            }
        }
     
    })

    const listFilmsStyleFunction = (listFilms) => {
        const arrayFilms = []
        let listFilmsForArrayFilms = []
        for(let i = 0, k = 1; i <= listFilms.length; i++){
            if(listFilms.length/2 === i){
                arrayFilms.push(<div key={k} className='row'>
                    {listFilmsForArrayFilms}
                </div>)
                k++
                listFilmsForArrayFilms = []
            }
            if(listFilms.length === i){
                arrayFilms.push(<div key={k} className='row'>
                    {listFilmsForArrayFilms}
                </div>)
                listFilmsForArrayFilms = []
            }
            listFilmsForArrayFilms.push(<div key={i} className='container col-3 box-content'>{listFilms[i]}</div>)
        }
        return arrayFilms;
    }
    
    const listFilmsStyle = listFilmsStyleFunction(listFilms)
    return <div className='container col-12 films'>
        {listFilmsStyle}
        {preloader && <Preloader  />}
    </div>
}


const mapStateToProps = (state) => {
    return {
        films: state.filmReducer.films,
        searchFilm: state.filmReducer.searchFilm,
        movieDetails: state.filmReducer.movieDetails,
        activeId: state.filmReducer.activeId,
        preloader: state.filmReducer.preloader,
    }
}

export default connect(mapStateToProps, { getAllFilmsThunk, getAllDataThunk, updateActiveIdAC, updatePreloaderAC })(Films)