import als from "async-local-storage";
import {responseValidation} from "../../setup/utility/responseValidation";
import {errorLogger} from "../../setup/utility/errorLogger";
import App from "../../App/App";



export const skeletonFetchProvider = async function (req) {
    try {
        await skeletonFetch(req);
    } catch (err) {
        errorLogger('SKELETON >', err, false, req);
    }
}


const skeletonFetch = async function (req) {
    const skeleton = App.skeleton

    // App component does not skeleton() property
    if (!skeleton) {
        debugLog('WITH OUT SKELETON. App Component has not skeleton property')
        return true;
    }

    // cache is disabled
    if (typeof skeleton.cache !== "number" || skeleton.cache <= 0) {
        debugLog('cache property is not number or more than ziro miliseconds. (set App.skeleton.cache)')
        await skeletonGetDataFromApi(req);
        return true;
    }

    // *** reset in develop *** delete global['SKELETON-CACHED-DATA'];
    const data = global['SKELETON-CACHED-DATA'];

    // read data from cache if not expired
    if (data !== undefined) {
        const notExpired = (global['SKELETON-CACHE-EXP'] - Date.now()) > 0;
        if (notExpired) {
            debugLog('READ from CACHE')
            pushDataToUpdatedState.success(data)
            return true;
        } else {
            debugLog('cache EXPIRED')
            delete global['SKELETON-CACHED-DATA']
        }
    }

    await
        skeletonGetDataFromApi(req)
        // caching data
            .then(function (data) {
                debugLog('CACHING data')
                global['SKELETON-CACHED-DATA'] = data
                global['SKELETON-CACHE-EXP'] = Date.now() + skeleton.cache;
            })
}





/**
 *  1) response vaidation
 *  2) push data to updatedState (redux)
 */
function skeletonGetDataFromApi(req) {
    const skeleton = App.skeleton
    debugLog('fetching from API')

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
                debugLog('data fetched SUCCESSFULLY')
                resolve(response.data);
            })
            .catch(function (err) {
                debugLog('ERROR in fetch skeleton')
                // push error to updatedState
                pushDataToUpdatedState.error()
                reject(err);
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





// active switch for debuging logs
const debug = JSON.parse(process.env.RSSR_SKELETON_DEBUG);

function debugLog(msg) {
    if (debug)
        console.info('SKELETON > ' + msg)
}
