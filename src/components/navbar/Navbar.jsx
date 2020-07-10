import React, { useState } from 'react';
import { connect } from 'react-redux'; 
import '../components-style.css';
import SizeMeRenderer from 'react-sizeme';
import  { updateSearchFilmsAC, updateFilmsAC } from '../../redux/film-reducer';
import { searchFilmAlgorithm, sortFolmsAlgorithm } from '../../functions/navbar-functions'

const Navbar = (props) => {
    const {listFilmsTitle, size, updateSearchFilmsAC, films, updateFilmsAC} = props
    const [ hintsForSearch, setHintsForSearch ] = useState([])
    const indent = size.width-290
    const getFilms = (e) => {
        const film = listFilmsTitle.find((film) => film === e.target.innerHTML)
        updateSearchFilmsAC(film)
    }

    const sortFilms = () => {
        const sortFilms = sortFolmsAlgorithm(films)
        updateFilmsAC(sortFilms)
    } 
  
  
    const searchFilm = (e) => {
        const listSearchFilms = searchFilmAlgorithm(e.target.value, listFilmsTitle)
        setHintsForSearch(listSearchFilms)
    }

    const hintList = hintsForSearch.map((hint, id)=>{
        return <div className='find-body-box' key={id} onClick={getFilms}>
            {hint}
        </div>
    })
    return <div className="navbar-box">
        <nav className="navbar navbar-light bg-light justify-content-between">
        <a className="navbar-brand">Films</a>
        <form className="form-inline">
            <input onChange={searchFilm} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button 
                onClick={sortFilms}
                className="btn btn-outline-success my-2 my-sm-0" 
                type="button" >Sort</button>
        </form>
        </nav>
        {
            hintList.length > 0 && <div className='container find-body' style={{"left":indent}} >
                {hintList}
            </div>
        }
        
    </div>
}

const mapStateToProps = (state) => {
    return {
        listFilmsTitle: state.filmReducer.listFilmsTitle,
        films: state.filmReducer.films
    }
} 

export default SizeMeRenderer()(connect(mapStateToProps,{updateSearchFilmsAC, updateFilmsAC})(Navbar))