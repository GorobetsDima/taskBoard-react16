import React from "react";
import {render} from "react-dom";
import {Router, Route, browserHistory} from "react-router";
import {Provider} from 'react-redux';
import {syncHistoryWithStore} from "react-router-redux";
import ReactApp from "./components/reactApp";
import store from "./store/index";

const history = syncHistoryWithStore(browserHistory, store);


render(
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={ReactApp}>
            </Route>
        </Router>
    </Provider>

    , document.getElementById('entry'));
