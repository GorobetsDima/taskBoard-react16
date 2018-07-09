import React from "react";
import {Provider} from "react-redux";
import {render} from "react-dom";
import store from "./store/store";
import App from "./containers/App";
import "./index.css";
import "react-redux-toastr/lib/css/react-redux-toastr.min.css";
import "bootstrap/dist/css/bootstrap.css";
import registerServiceWorker from "./registerServiceWorker";

registerServiceWorker();


render(<Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));


