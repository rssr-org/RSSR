import {matchPath} from "react-router-dom";
import {routeMap} from "../../setup/routeMap";



// define public structure and variables
export const initialize = function (DUCT) {
    /** updatedState **/
    // we use updatedState to set value of RSSR_UPDATED_REDUX_STATES in index template
    // to pass data to the client for syncing redux and merge with defaultState
    // of 'stateName' to create store on the server
    DUCT.updatedState = {}




    /** match **/
    /*
    * CONSTANT {undefined || object}
    *
    * match is match object of react-router-dom
    * match of "site.com/post/1" is { path: '/post/:postId', url: '/post/1', isExact: true, params: {postId: '1'} }
    */
    const matchedRouteMapItem = routeMap.find(route => {
        // is object for matched or null for not matched
        const match = matchPath(DUCT.req.path, route);

        if (match)
            DUCT.match = match

        return match;
    });

    // can not match to any route map item
    if (matchedRouteMapItem === undefined)
        throw new Error('⛔ can not match to any route map item! define "*" path for not matched routes to be able to handle e-404, page not found errors.');





    const hasComponent = matchedRouteMapItem.hasOwnProperty('component')
    const hasFetch = hasComponent && matchedRouteMapItem.component.hasOwnProperty('fetch')
    const hasStateName = hasComponent && matchedRouteMapItem.component.hasOwnProperty('stateName')

    if (hasFetch) {
        if (!hasStateName)
            throw new Error('⛔ component does not "stateName" param. when define fetch() for component, you must define "stateName" param.');

        /** fetch **/
        /*
        * CONSTANT {function || undefinded}
        *
        * fetch() method of component of matched route item
        * when component has not fetch() then fetch is undefined
        * NOTICE: when "fetch" is undefind mean hasFetch is false
        */
        DUCT.fetch = matchedRouteMapItem.component.fetch

        /** stateName **/
        /*
        * CONSTATN {string}
        *
        * stateName is name of 'stateName' state and define when fetch type is
        */
        DUCT.stateName = matchedRouteMapItem.component.stateName

    } else if (hasStateName) {
        throw new Error('⛔ component does not fetch() param. when define "stateName" for component, you must define fetch() param.');
    }





    /** status **/
    /*
    * VARIABLE {number}
    *
    * response status code like 200
    * status get value from sevral places
    * NOTICE: when occur <Redirect> status is 301
    *
    *   SUCCESSFUL (render index template successfully)
    *          first --> get status prop of matchedRouteMapItem if exist (item of routeMap)
    *          second -> if matchedRouteMapItem has not status then status is 200 (default value)
    *          third --> if hasFetch is true then get fetch status in fetchProvider()
    *          fourth -> status is 500 when DUCT.status is undefined (defined in render() - send response place)
    *
    *   ERROR (defined in failedRequest() - occur an error in proccess)
    *          only -> status is 500
    */
    const status = matchedRouteMapItem.status !== undefined ? matchedRouteMapItem.status : 200;

    if (typeof status !== 'number')
        throw new Error('⛔ status of routeMap is NOT number. status must be number like 404. status is ' + status);

    DUCT.status = status
}
