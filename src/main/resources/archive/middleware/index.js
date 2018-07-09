import {applyMiddleware, compose} from "redux";
import {ADD_TITLE} from "../constants/action-types";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const titleMiddleware = store => next => action => {
    console.log("midwar start");
    console.log(action);
    console.log("midwar contin");
    if (action) {
        if (action.type === ADD_TITLE) {
            action.payload.id = action.payload.id + 10;
            next(action);
        } else {
            next(action);
        }
    }
};


const middlewareArray = [titleMiddleware];

const middleware = composeEnhancers(applyMiddleware(...middlewareArray));

export default middleware;