import als from "async-local-storage";
import {responseValidation} from "../../setup/utility/responseValidation";
import {convertErrorToResponse} from "../../setup/utility/convertErrorToResponse";



// fetch data of component from server
export const fetchProvider = async function (req) {
    const fetch = als.get('fetch')

    // when component has not fetch() then fetch is undefined and fetchType is 'WITH_OUT_FETCH'
    if (!fetch) {
        debugLog('this route HAS NOT FETCH property', req)
        return true
    }

    debugLog('fetch data from API', req)

    // pass to fetch() as params ::1::
    const ftechParams = {
        req: req, // Express js request object
        match: als.get('match'), // match is match object of react-router-dom
        query: req.query //exp: {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
    }

    // ::2::
    // NOTICE: catch() will be handel on the server.js with failedRes()
    await
        fetch(ftechParams)
            .then(function (response) {
                debugLog('fetch data SUCCESSFULLY', req)
                fetchResponsePreparing(response)
            })
            .catch(function (error) {
                debugLog('ERROR in fetch', req)
                const response = convertErrorToResponse(error, req)
                fetchResponsePreparing(response)
            })
}




/**
 *  1) response vaidation
 *  2) set response status code
 *  3) push data to updatedState (redux)
 */
function fetchResponsePreparing(response) {
    // excute 'throw new Error' if response is not valid
    responseValidation(response)

    // set response status code
    als.set('status', response.status, true)

    const stateName = als.get('stateName')
    const updatedState = als.get('updatedState')
    updatedState[stateName] = response.data
    als.set('updatedState', updatedState, true)

    // use for improve SEO
    if(response.schema)
        als.set('schema', response.schema, true)
}





// active switch for debuging logs
const debug = JSON.parse(process.env.RSSR_FETCHER_DEBUG);

function debugLog(msg, req) {
    if (debug)
        console.info('FETCH > ' + msg + '. route: ', req.originalUrl)
}
