import {compose, createStore as createStoreProvider} from 'trim-redux';
import {IS_BROWSER} from "./constant";
import {isSet} from "./utility/checkSet";





/**
 * Redux states
 *
 * each item in this list is a one state in redux store
 * and value of this is default value
 */
export const defaultState = {
    localUser: {updated: false, token: null, detail: null},
    post: null,
    home: {isLoading: true},
    skeleton: {
        title: 'Occor when Error fetch skeleton!'
    }
}





/**
 * Redux-DevTools
 *
 * define parameters of browser "Redux-DevTools" plugin in development mode
 *  - chrome: https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en
 *  - firefox: https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/
 */
let composeEnhancer = compose;
//
if (JSON.parse(process.env.RSSR_REDUX_DEV_TOOLS) && IS_BROWSER)
    composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;





/**
 * redux thunk
 */
// composeEnhancer = composeEnhancer(applyMiddleware(thunk));





/**
 * create Redux Store
 *
 * cearte store with defaultState
 * but in server rendering each state changed (exp: data of home page fetched in server and set to home state)
 * then store create with changed state (in top exp, home state has real data but other state have default data or empty)
 *
 * @param state <object>: object of states with default value
 * @returns {any} : redux store object
 */
export const createStore = (state = {...defaultState}) => createStoreProvider(state, composeEnhancer);





/**
 * create store with combine server feched data and default store states
 * @returns {any} : redux store object
 */
export const clientCreateStore = function () {
    let states;

    if (isSet(window.RSSR_UPDATED_REDUX_STATES)) {
        states = {
            ...defaultState,
            ...window.RSSR_UPDATED_REDUX_STATES
        };
        delete window.RSSR_UPDATED_REDUX_STATES;
    }

    return createStore(states);
}
