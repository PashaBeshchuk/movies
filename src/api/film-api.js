import api from './api';

const movieAPI = {
    getAllFilms: () => {
        return api.get('/films/')
    },
    getAllData:(data) => {
        return api.get(data)
    }
}

export default movieAPI;