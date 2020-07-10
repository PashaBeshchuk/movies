import { createStore, combineReducers, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import filmReducer from './film-reducer';

const reducers = combineReducers({filmReducer});
const store = createStore(reducers, applyMiddleware(reduxThunk));

export default store;