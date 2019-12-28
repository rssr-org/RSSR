import als from "async-local-storage";
import {responseValidation} from "../../setup/utility/responseValidation";


export const skeletonFetchProvider = async function (req) {
    const skeletonFetch = als.get('skeletonFetch')

    // App component does not skeleton() property
    if (!skeletonFetch) {
        debugLog('WITH OUT SKELETON. App Component has not skeleton property')
        return true;
    }

    // cache is disabled
    if (typeof skeletonFetch.cache !== "number" || skeletonFetch.cache <= 0) {
        debugLog('skeleton WITH OUT CACHE. skeleton.cache is not number and more than ziro')
        await skeletonGetDataFromApi(req);
        return true;
    }

    // delete global['SKELETON-CACHED-DATA'];
    const data = global['SKELETON-CACHED-DATA'];

    // when cache data exist
    if (data !== undefined) {
        const notExpired = (global['SKELETON-CACHE-EXP'] - Date.now()) > 0;
        if (notExpired) {
            debugLog('READ skeleton data from CACHE')
            pushDataToUpdatedState.success(data)
            return true;
        } else {
            debugLog('skeleton cache EXPIRED')
            delete global['SKELETON-CACHED-DATA']
        }
    }

    await
        skeletonGetDataFromApi(req)
        // caching data
            .then(function (data) {
                debugLog('CACHING skeleton data')
                global['SKELETON-CACHED-DATA'] = data
                global['SKELETON-CACHE-EXP'] = Date.now() + skeletonFetch.cache * 60 * 60 * 1000;
            })
}





/**
 *  1) response vaidation
 *  2) push data to updatedState (redux)
 */
function skeletonGetDataFromApi(req) {
    const skeletonFetch = als.get('skeletonFetch')
    debugLog('fetch skeleton data from API')

    //::1:: pass to skeleton fetch as params
    const ftechParams = {
        req: req, // Express js request object
        match: als.get('match'), // match is match object of react-router-dom
        query: req.query //exp: {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
    }

    return new Promise(function (resolve, reject) {
        skeletonFetch(ftechParams)
            .then(function (response) {
                responseValidation(response)
                pushDataToUpdatedState.success(response.data)
                debugLog('fetch skeleton data SUCCESSFULLY')
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
 * set value of 'skeleton' OR 'skeletonError' in 'updatedState'
 */
const pushDataToUpdatedState = {
    success: function (data) {
        const updatedState = als.get('updatedState')
        updatedState['skeleton'] = data
        als.set('updatedState', updatedState, true)
    },
    error: function () {
        const updatedState = als.get('updatedState')
        updatedState['skeletonError'] = true
        als.set('updatedState', updatedState, true)
    }
}





// active switch for debuging logs
const debug = JSON.parse(process.env.RSSR_SKELETON_DEBUG);

function debugLog(msg) {
    if (debug)
        console.info('SKELETON > ' + msg)
}
