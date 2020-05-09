import {compose, createStore as createStoreProvider} from 'trim-redux';
import {IS_BROWSER} from "./constant";





/**
 * Redux states
 *
 * each item in this list is one state in redux store
 * and value of this is the default value
 */
export const defaultState = {
    user: {updated: false, token: null, detail: null},
    post: null,
    homepage: {isLoading: true},
    skeleton: {
        // when error occurs in both client and server then skeleton contains this data
        dailyMessage: 'opps! occur error'
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





/**
 * create Redux Store
 *
 * create store with defaultState
 * in server rendering, we do not have to make the store only by defining default state. In case of any state changes, we can 
 * replace defaultState with the changed state and rewrite them.
 * (exp: in home page we have a data fetch, so we replace it with defaultState. In this example, home state has real data 
 * but other states have default data or remain empty
 * @param state <object>: object of states with default value
 * @returns {any} : redux store object
 */
export const createStore = (state = {...defaultState}) => createStoreProvider(state, composeEnhancer);





/**
 * create store by combining server feched data and default store states
 * @returns {any} : redux store object
 */
export const clientCreateStore = function () {
    let states;

    if (window.RSSR_UPDATED_REDUX_STATES !== undefined) {
        states = {
            ...defaultState,
            ...window.RSSR_UPDATED_REDUX_STATES
        };
        delete window.RSSR_UPDATED_REDUX_STATES;
    }

    return createStore(states);
}
