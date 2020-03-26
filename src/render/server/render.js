import React from 'react';
import ReactDOMServer from "react-dom/server";
import {StaticRouter} from "react-router-dom";
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from "react-redux";
import {createStore, defaultState} from "../../setup/store";
import App from "../../App/App";
import {errorLogger} from "../../setup/utility/errorLogger";
import Index from "../Template/Index";
import Error from "../Template/Error";



/**
 *  to render view on the server and send response as HTML to client
 */
export const render = function (error, DUCT) {
    let view;
    const routerContext = {};
    const helmetContext = {};

    if (!error) {
        // normal views
        const updatedState = DUCT.updatedState
        const dataExist = Object.getOwnPropertyNames(updatedState).length;
        const states = dataExist ? {...defaultState, ...updatedState} : undefined; // when passed states is undefined then createStore use defaultState
        const store = createStore(states);

        view = (
            <Provider store={store}>
                <StaticRouter location={DUCT.req.url} context={routerContext}>
                    <HelmetProvider context={helmetContext}>
                        <App/>
                    </HelmetProvider>
                </StaticRouter>
            </Provider>
        );
    } else {
        // when error occured during fetch and process
        errorLogger('SERVER >', error, false, DUCT.req);
        view = (
            <HelmetProvider context={helmetContext}>
                <Error error={error}/>
            </HelmetProvider>
        )
    }

    // render view to HTML
    const renderedView = ReactDOMServer.renderToString(view);

    if (!routerContext.url) {
        // get final response status code
        // const status = !error ? (als.get('status') || 500) : 500;
        const status = !error ? (DUCT.status|| 500) : 500;

        // make HTML response
        let response = <Index renderedView={renderedView} helmet={helmetContext.helmet} error={error} DUCT={DUCT}/>;
        response = ReactDOMServer.renderToString(response);
        response = '<!DOCTYPE html>' + response;

        DUCT.res.status(status).send(response);
    } else {
        // when <Redirect> rendered
        DUCT.res.redirect(301, routerContext.url);
    }
}
