import {combineReducers, createStore} from 'redux';
import {rootReducer} from "../reducers/index";
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import middleware from '../middleware/index';

const reducers = combineReducers({
    rootReducer,
    // form:formReducer,
    routing
});

const store = createStore(reducers, middleware);

// console.log(store.getState());


export default store;