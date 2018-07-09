import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import ReduxToastr from "react-redux-toastr";
import Board from "./board/Board";
import Form from "./form/Form";

const CardFormRoute = () => (
    <Switch>
        <Route exact path='/cardForm/:laneId' component={Form}/>
        <Route path='/cardForm/:laneId/:cardId' component={Form}/>
    </Switch>
);

const App = () => (
    <div>
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Board}/>
                <Route path="/cardForm" component={CardFormRoute}/>
            </Switch>
        </BrowserRouter>
        <ReduxToastr timeOut={800}
                     newestOnTop={true}
                     preventDuplicates
                     position="top-right"
                     transitionIn="fadeIn"
                     transitionOut="fadeOut"/>
    </div>
);


export  default App;
