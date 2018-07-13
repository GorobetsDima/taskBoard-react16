import {combineReducers, createStore} from 'redux';
import {boardReducer, loadingReducer} from "../reducers/reducers";
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import {reducer as toastrReducer} from 'react-redux-toastr'
import middleware, {sagaMiddleware} from '../middleware/middleware';
import rootSaga from '../actions/actions';

const reducers = combineReducers({
    boardReducer,
    loadingReducer,
    form:formReducer,
    toastr: toastrReducer,
    routing
});

const store = createStore(reducers, middleware);

sagaMiddleware.run(rootSaga);

export default store;