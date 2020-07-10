import React from 'react';
import '../components-style.css';


const FilmDAta = (props) => {
    const {getAllDataThunk, film, movieDetails, updateActiveIdAC, updatePreloaderAC} = props
    let visualPlanets, visualSpecies, visualStarships, visualVehicles,  visualCharacters
        
    const visualData = (array) => {
        const data = [] 
        for(let i = 0 ; i < array.length; i++){
            for(let dataElem in array[i]) {
                if(Array.isArray(array[i][dataElem])) {  
                } else {
                    data.push(<div className='detalData'><span>{dataElem}</span>: {array[i][dataElem]}</div>)
                }
            }
        }
        return data
    }
    
    const getAllDataFilm = () => {
        updateActiveIdAC(film.episode_id)
        updatePreloaderAC(true)
        const { planets, species, starships, vehicles, characters } = film
        getAllDataThunk({
            planets,
            species,
            starships,
            vehicles,
            characters
        })
    }
    if(movieDetails){
        const { planets, species, starships, vehicles, characters }  = movieDetails
        if(planets) { visualPlanets = visualData(planets) }
        if(species) { visualSpecies = visualData(species) }
        if(starships) { visualStarships = visualData(starships) }
        if(vehicles) { visualVehicles = visualData(vehicles) }
        if(characters) { visualCharacters = visualData(characters) }
    }
    
        
    return <>
        <h1 onClick={getAllDataFilm}>{film.title}</h1>
        <p>Producer: { film.producer }</p>
        <p>Director: { film.producer }</p>
        <p>{ film.opening_crawl }</p>
        <div>
           {visualPlanets}
           {visualSpecies}
           {visualStarships}
           {visualVehicles}
           {visualCharacters}
        </div>
        
    </>
}

export default FilmDAta