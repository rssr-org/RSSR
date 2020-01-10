import {getStore, setStore} from "trim-redux";
import {queryStringParams} from "rssr-query-string";
import {matchPath} from "react-router-dom";
import {browserHistory} from "../../setup/browserHistory";
import {routeMap} from "../../setup/routeMap";
import {debugLog} from "./debugLog";


export const skeletonClientProvider = function (fetchFn) {
    // when server fetch data successfully
    if (getStore('skeletonErroredInServer') !== true) {
        debugLog('WENT_WELL')
        return;
    }

    // calculate fetch params
    const ftechParams = {
        match: {},
        query: queryStringParams()
    };

    routeMap.find(route => {
        // is object for matched or null for not matched
        const match = matchPath(browserHistory.location.pathname, route);

        if (match)
            ftechParams.match = match;

        return match;
    });

    fetchFn(ftechParams)
        .then(function (response) {
            setStore('skeleton', response.data)
            debugLog('FETCHED_IN_CLIENT')
        })
        .catch(function (err) {
            console.error(err)
            debugLog('CLIENT_ERRORED')
        })
}
