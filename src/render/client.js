import React from 'react';
import {Provider} from "trim-redux";
import {Router} from "react-router-dom";
import reactDom from "react-dom";
import {clientCreateStore} from "../setup/store";
import {browserHistory} from "../setup/browserHistory";
import localStorageSetup from "../setup/localStorage";
import App from "../App/App";
import "bootstrap";
import "../setup/axiosConfig"
import "react-toastify/dist/ReactToastify.min.css";
import "../setup/style/bootstrap/bootstrap.scss";
import "../setup/utility/samplejQueryPlugin";
import "../setup/style/animate.scss";
import "../setup/style/limitedResonsive.scss";
import "../setup/style/public.scss";

// ::4::
if (!window.RSSR_PROCCESS_ERROR) {
    // define public structur and varibales
    localStorageSetup();

    // create redux store with posted value from "RSSR_UPDATED_REDUX_STATES"
    const store = clientCreateStore();

    // root element of application
    const appWrap = document.getElementById('app-root');

    // clinet app
    const app = (
        <Provider store={store}>
            <Router history={browserHistory}>
                <App/>
            </Router>
        </Provider>
    );

    reactDom.render(app, appWrap);
}
