import {responseValidation} from "../../setup/utility/responseValidation";
import {errorLogger} from "../../setup/utility/errorLogger";
import App from "../../App/App";
import {debugLog} from "./debugLog";



// locking the fetch to prevent parallel requests.
let fetchLock = false;



/**
 * call skeleton fetch and handle errors
 */
export const skeletonServerProvider = async function (DUCT) {
    // skeleton is disabled
    if (!App.skeleton)
        return true;

    try {
        await skeletonFetch(DUCT);
    } catch (err) {
        errorLogger('SKELETON >', err, false, DUCT.req);
    }
}




/**
 * try to read data from cache or get data from API and update cache
 */
const skeletonFetch = async function (DUCT) {
    const skeleton = App.skeleton

    // *** reset in develop *** delete global['SKELETON-CACHED-DATA'];
    const data = global['SKELETON-CACHED-DATA'];

    // read data from cache if not expired
    if (data !== undefined) {
        const notExpired = (global['SKELETON-CACHE-EXP'] - Date.now()) > 0;
        if (notExpired) {
            debugLog('READ_FROM_CACHE')
            pushDataToUpdatedState.success(DUCT, data)
            return true;
        } else {
            debugLog('CACHE_EXPIRED')
            delete global['SKELETON-CACHED-DATA']
        }
    }

    if (!fetchLock) {
        fetchLock = true;
        await skeletonGetDataFromApi(DUCT)
            .then(function (data) {
                debugLog('CACHING_DATA')
                global['SKELETON-CACHED-DATA'] = data
                global['SKELETON-CACHE-EXP'] = Date.now() + skeleton.cache;
            })
    }
}





/**
 *  1) response validation
 *  2) push data to updatedState (redux)
 */
function skeletonGetDataFromApi(DUCT) {
    const skeleton = App.skeleton
    debugLog('FETCHING_API')

    // pass to skeleton fetch as params
    const ftechParams = {
        req: DUCT.req, // Express js request object
        match: DUCT.match, // match is match object of react-router-dom
        query: DUCT.req.query //exp: {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
    }

    return new Promise(function (resolve, reject) {
        skeleton(ftechParams)
            .then(function (response) {
                responseValidation(response)
                pushDataToUpdatedState.success(DUCT, response.data)
                debugLog('SUCCESSFULLY_FETCH')
                resolve(response.data);
            })
            .catch(function (err) {
                debugLog('SERVER_ERRORED')
                // push error to updatedState
                pushDataToUpdatedState.error(DUCT)
                reject(err);
            })
            .then(function () {
                fetchLock = false;
            })
    })
}





/**
 * set value of 'skeleton' OR 'skeletonErroredInServer' in 'updatedState'
 */
const pushDataToUpdatedState = {
    success: function (DUCT, data) {
        DUCT.updatedState['skeleton'] = data
    },
    error: function (DUCT) {
        DUCT.updatedState['skeleton'] = {isErrorData: true}
    }
}
