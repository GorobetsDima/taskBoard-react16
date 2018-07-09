import {applyMiddleware, compose} from "redux";
import thunk from 'redux-thunk';
import {FETCH_DATA} from "../constants/action-types";
import {fetchDataSuccess, fetchDataFailure} from "../actions/actions";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const boardMiddleware = store => next => action => {
    console.log("midwar start");
    console.log(action);
    console.log("midwar contin");
    if (action) {
        if (action.payload && typeof action.payload.then === 'function') {
            if (action.type === FETCH_DATA) {
                // action.payload
                //     .then((response) => {
                //         store.dispatch(fetchDataSuccess(response.data));
                //     }, error=> {
                //         store.dispatch(fetchDataFailure(error));
                //     });
            } else {
                next(action);
            }
        } else {
            next(action);
        }
    }
};


const middlewareArray = [boardMiddleware, thunk];

const middleware = composeEnhancers(applyMiddleware(...middlewareArray));

export default middleware;