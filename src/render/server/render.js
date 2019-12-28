import React from 'react';
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router-dom";
import als from "async-local-storage";
import {Helmet} from "react-helmet";
import {Provider} from "react-redux";
import {createStore, defaultState} from "../../setup/store";
import App from "../../App/App";
import {errorLogger} from "../../setup/utility/errorLogger";
import Index from "../Template/Index";
import Error from "../Template/Error";



/**
 * render view on the server and send response as HTML to client
 */
export const render = function (error, req, res) {
    let view;
    const context = {};

    if (!error) {
        const fetch = als.get('fetch');
        const updatedState = als.get('updatedState');
        const dataExist = !!fetch && Object.getOwnPropertyNames(updatedState).length;
        const states = dataExist ? {...defaultState, ...updatedState} : undefined; // when passed states is undefined then createStore use defaultState
        const store = createStore(states);

        view = (
            <Provider store={store}>
                <StaticRouter location={req.url} context={context}>
                    <App/>
                </StaticRouter>
            </Provider>
        );
    } else {
        errorLogger('SERVER >', error, false, req);
        view = <Error error={error}/>
    }

    const renderedView = ReactDOMServer.renderToString(view);
    const helmet = Helmet.renderStatic();

    if (!context.url) {
        const status = !error ? (als.get('status') || 500) : 500;

        // make HTML response
        let response = <Index renderedView={renderedView} helmet={helmet} error={error}/>;
        response = ReactDOMServer.renderToString(response);
        response = '<!DOCTYPE html>' + response;

        res.status(status).send(response);
    } else {
        // when <Redirect> rendered
        res.redirect(301, context.url);
    }
}
