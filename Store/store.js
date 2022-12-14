import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';
import rootReducer from '../Services/Reducer/Root-Reducer/root-reducer';

const middleWares = [reduxThunk];

if (import.meta.env.NODE_ENV === "development") {
    middleWares.push(logger)
}

// middleware
const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store; 