import filmAPI from '../api/film-api'
export const editRegister = (letter) => {
    let differentRegisterLetter
    if(letter.codePointAt() >= 97 && letter.codePointAt() <= 122 ) {
        //capital letter
        differentRegisterLetter = letter.codePointAt() - 32
        return differentRegisterLetter
    } else if(letter.codePointAt() >= 65 && letter.codePointAt() <= 90 ) {
        //small lettet
        differentRegisterLetter = letter.codePointAt() + 32
        return differentRegisterLetter
    }
}


export const searchFilmAlgorithm  = (searchLetters, filmsTitle) => {
    const searchLettersArray = searchLetters.split("");
    let matchingNames = [];
    let differentRegister;
    for(let i = 0; i < searchLettersArray.length; i++) {
        if(i === 0) {
            differentRegister = editRegister(searchLettersArray[i])
            for(let j = 0; j < filmsTitle.length; j++){
                const arrayLettersFilmsTitle = filmsTitle[j].split("")
                if(arrayLettersFilmsTitle[i].codePointAt() === searchLettersArray[i].codePointAt() 
                    ||
                    arrayLettersFilmsTitle[i].codePointAt() === differentRegister){
                    matchingNames.push(filmsTitle[j])
                }
            }
        } else {
            const matchingNamesFilter = [...matchingNames]
            let z 
            for( z = 0 ; z < matchingNamesFilter.length; z++) {
                const arrayMatchingNamesFilter = matchingNamesFilter[z].split("")
                for(let k = 0; k < searchLettersArray.length; k++) {
                    differentRegister = editRegister(searchLettersArray[k])
                    if(arrayMatchingNamesFilter[k].codePointAt() !== searchLettersArray[k].codePointAt() 
                    &&
                    arrayMatchingNamesFilter[k].codePointAt() !== differentRegister) {
                        matchingNamesFilter.splice( z,1)
                        z = 0
                        break
                    }
                }
            }
            matchingNames = matchingNamesFilter
        }
        
    }
    return matchingNames
}


export const sortFolmsAlgorithm = (films) => {
    const cloneArrayFilms = [...films] 
    for(let i = 0; i < cloneArrayFilms.length; i++) { 
        let ckechFilm = cloneArrayFilms[i], lastItemIndex = i-1; 
        while(lastItemIndex >= 0 && cloneArrayFilms[lastItemIndex].title > ckechFilm.title) { 
            cloneArrayFilms[lastItemIndex+1] = cloneArrayFilms[lastItemIndex]; 
            lastItemIndex--; 
        }
        cloneArrayFilms[lastItemIndex+1] = ckechFilm; 
    }
    return cloneArrayFilms;
}


export const getAllDataForFilm = async (dataFilm) => {
    const allData = []
    for(let j = 0; j < dataFilm.length; j++){
        const breakLink = dataFilm[j].split('/')
        const url = `/${breakLink[4]}/${breakLink[5]}`
        const {data} = await filmAPI.getAllData(url)
        allData.push(data)
    } 
    return allData
}

export const getAllData = async (dataFilm) =>{
    const keys = Object.keys(dataFilm)
    const cloneDataFilm = {...dataFilm}
    
    for(let i = 0; i < keys.length; i++){
        if(Array.isArray(dataFilm[keys[i]])){
            let data = await getAllDataForFilm((dataFilm[keys[i]]))
            cloneDataFilm[keys[i]] = data  
        }
    }
    return cloneDataFilm
}