import als from "async-local-storage";
import {matchPath} from "react-router-dom";
import {routeMap} from "../../setup/routeMap";
import {isNotSet, isSet} from "../../setup/utility/checkSet";
import App from "../../App/App";



// define public structur and varibales
export const initialize = function (req) {
    /** updatedState **/
    // we use updatedState to set value of RSSR_UPDATED_REDUX_STATES in index template
    // to pass data to the client for syncing reduxes and merge with defaultState
    // of redux to creare store on the server
    als.set('updatedState', {}, true);




    /** skeleton **/
    // fetch fn of skeleton data (public and basic data) in all route of app
    // this data store in redux skeleton satate
    if (App.skeleton)
        als.set('skeletonFetch', App.skeleton, true);





    /** match **/
    /*
    * CONSTATN {undefined || object}
    *
    * match is match object of react-router-dom
    * match of "site.com/post/1" is { path: '/post/:postId', url: '/post/1', isExact: true, params: {postId: '1'} }
    */
    const matchedRouteMapItem = routeMap.find(route => {
        // is object for matched or null for not matched
        const match = matchPath(req.path, route);

        if (match)
            als.set('match', match, true);

        return match;
    });

    // can not match to any route map item
    if (isNotSet(matchedRouteMapItem))
        throw new Error('⛔ can not match to any route map item! define "*" path for not matched routes to can handle e-404, page not found errors.');





    const
        hasComponent = matchedRouteMapItem.hasOwnProperty('component'),
        hasFetch = hasComponent && matchedRouteMapItem.component.hasOwnProperty('fetch'),
        hasStateName = hasComponent && matchedRouteMapItem.component.hasOwnProperty('redux');

    if (hasFetch) {
        if (!hasStateName)
            throw new Error('⛔ component does not redux param. when define fetch() for component, you must define "redux" param.');

        /** fetch **/
        /*
        * CONSTATN {function || undefinded}
        *
        * fetch() method of component of matched route item
        * when component has not fetch() then fetch is undefined
        * NOTICE: when "fetch" is undefind mean hasFetch is false
        */
        als.set('fetch', matchedRouteMapItem.component.fetch, true);


        /** stateName **/
        /*
        * CONSTATN {string}
        *
        * stateName is name of redux state and define when fetch type is
        */
        als.set('stateName', matchedRouteMapItem.component.redux, true);

    } else if (hasStateName) {
        throw new Error('⛔ component does not fetch() param. when define "redux" for component, you must define fetch() param.');
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
    *          fourth -> status is 500 when als.get('status') is undefined (defined in render() - send response place)
    *
    *   ERROR (defined in failedRequest() - occur an error in proccess)
    *          only -> status is 500
    */
    const status = isSet(matchedRouteMapItem.status) ? matchedRouteMapItem.status : 200;

    if (typeof status !== 'number')
        throw new Error('⛔ status of routeMap is NOT number. status must be number like 404. status is ' + status);

    als.set('status', status, true);
}
