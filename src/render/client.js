import React from 'react';
import reactDom from "react-dom";
import {Provider} from "trim-redux";
import {Router} from "react-router-dom";
import {HelmetProvider} from 'react-helmet-async';

// --- Structures ---//
import {clientCreateStore} from "../setup/store";
import {browserHistory} from "../setup/browserHistory";
import localStorageSetup from "../setup/localStorage";
import "../setup/axiosConfig"
import App from "../App/App";

//---- jQuery Plugins ----//
import "../setup/utility/samplejQueryPlugin";

//---- Public styles ----//
import "../setup/style/public.scss";
// react-toastify
import "react-toastify/dist/ReactToastify.min.css";
// Bootstrap
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";



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
                <HelmetProvider>
                    <App/>
                </HelmetProvider>
            </Router>
        </Provider>
    )

    // render on client with hydrate() and render() when has not Child Nodes
    const isMarkupPresent = appWrap.hasChildNodes();
    const method = isMarkupPresent ? reactDom.hydrate : reactDom.render;
    method(app, appWrap);
}
