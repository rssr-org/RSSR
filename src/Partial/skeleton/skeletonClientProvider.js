import {getStore, setStore} from "trim-redux";
import {queryStringParams} from "rssr-query-string";
import {matchPath} from "react-router-dom";
import {browserHistory} from "../../setup/browserHistory";
import {routeMap} from "../../setup/routeMap";


export const skeletonClientProvider = function (skeletonFetch) {
    // when server fetch data successfully
    if (getStore('skeletonErroredInServer') !== true){
        debugLog(false)
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

    skeletonFetch(ftechParams)
        .then(function (response) {
            setStore('skeleton', response.data)
            debugLog(true)
        })
}


function debugLog(inClient) {
    if (JSON.parse(process.env.RSSR_SKELETON_DEBUG))
        console.info((inClient ? '🙎‍♂️' : '🌎') + ' fetch skeleton in ' + (inClient ? 'client' : 'server'));
}
