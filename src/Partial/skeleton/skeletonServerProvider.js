import als from "async-local-storage";
import {responseValidation} from "../../setup/utility/responseValidation";
import {errorLogger} from "../../setup/utility/errorLogger";
import App from "../../App/App";
import {debugLog} from "./debugLog";



// locking the fetch to prevent parallel requests.
let fetchLock = false;



/**
 * call skeleton fetch and handle errors
 */
export const skeletonServerProvider = async function (req) {
    // skeleton is disable
    if (!App.skeleton)
        return true;

    try {
        await skeletonFetch(req);
    } catch (err) {
        errorLogger('SKELETON >', err, false, req);
    }
}




/**
 * try to read data from cache or get data from API and update cache
 */
const skeletonFetch = async function (req) {
    const skeleton = App.skeleton

    // *** reset in develop *** delete global['SKELETON-CACHED-DATA'];
    const data = global['SKELETON-CACHED-DATA'];

    // read data from cache if not expired
    if (data !== undefined) {
        const notExpired = (global['SKELETON-CACHE-EXP'] - Date.now()) > 0;
        if (notExpired) {
            debugLog('READ_FROM_CACHE')
            pushDataToUpdatedState.success(data)
            return true;
        } else {
            debugLog('CACHE_EXPIRED')
            delete global['SKELETON-CACHED-DATA']
        }
    }

    if (!fetchLock) {
        fetchLock = true;
        await skeletonGetDataFromApi(req)
            .then(function (data) {
                debugLog('CACHING_DATA')
                global['SKELETON-CACHED-DATA'] = data
                global['SKELETON-CACHE-EXP'] = Date.now() + skeleton.cache;
            })
    }
}





/**
 *  1) response vaidation
 *  2) push data to updatedState (redux)
 */
function skeletonGetDataFromApi(req) {
    const skeleton = App.skeleton
    debugLog('FETCHING_API')

    //::1:: pass to skeleton fetch as params
    const ftechParams = {
        req: req, // Express js request object
        match: als.get('match'), // match is match object of react-router-dom
        query: req.query //exp: {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
    }

    return new Promise(function (resolve, reject) {
        skeleton(ftechParams)
            .then(function (response) {
                responseValidation(response)
                pushDataToUpdatedState.success(response.data)
                debugLog('SUCCESSFULLY_FETCH')
                resolve(response.data);
            })
            .catch(function (err) {
                debugLog('SERVER_ERRORED')
                // push error to updatedState
                pushDataToUpdatedState.error()
                reject(err);
            })
            .finally(function () {
                fetchLock = false;
            })
    })
}





/**
 * set value of 'skeleton' OR 'skeletonErroredInServer' in 'updatedState'
 */
const pushDataToUpdatedState = {
    success: function (data) {
        const updatedState = als.get('updatedState')
        updatedState['skeleton'] = data
        als.set('updatedState', updatedState, true)
    },
    error: function () {
        const updatedState = als.get('updatedState')
        updatedState['skeletonErroredInServer'] = true
        als.set('updatedState', updatedState, true)
    }
}
