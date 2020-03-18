// import als from "async-local-storage";
import {responseValidation} from "../../setup/utility/responseValidation";
import {convertErrorToResponse} from "../../setup/utility/convertErrorToResponse";



// fetch data of component from server
export const fetchProvider = async function (DUCT) {
    // const fetch = als.get('fetch')
    const fetch = DUCT.fetch

    // when component does not have fetch() then fetch is undefined and fetchType is 'WITH_OUT_FETCH'
    if (!fetch) {
        debugLog('with out FETCH', DUCT)
        return true
    }

    debugLog('fetching data', DUCT)

    // pass to fetch() as params
    const ftechParams = {
        req: DUCT.req, // Express js request object
        // match: als.get('match'), // match is match object of react-router-dom
        match: DUCT.match, // match is match object of react-router-dom
        query: DUCT.req.query //exp: {foo:'bar'} in 'http://www.site.com/post/1?foo=bar'
    }

    // NOTICE: catch() will be handled on the server.js with failedRes()
    await
        fetch(ftechParams)
            .then(function (response) {
                debugLog('fetched SUCCESSFULLY', DUCT)
                fetchResponsePreparing(DUCT, response)
            })
            .catch(function (error) {
                debugLog('ERROR in fetch', DUCT)
                const response = convertErrorToResponse(error, DUCT.req)
                fetchResponsePreparing(DUCT, response)
            })
}




/**
 *  1) response validation
 *  2) set response status code
 *  3) push data to updatedState (redux)
 */
function fetchResponsePreparing(DUCT, response) {
    // execute 'throw new Error' if response is not valid
    responseValidation(response)

    // set response status code
    // als.set('status', response.status, true)
    DUCT.status = response.status

    // const stateName = als.get('stateName')
    // const updatedState = als.get('updatedState')
    const stateName = DUCT.stateName
    const updatedState = DUCT.updatedState
    updatedState[stateName] = response.data
    // als.set('updatedState', updatedState, true)
    DUCT.updatedState = updatedState

    // use for improving SEO
    if (response.schema)
        DUCT.schema = response.schema;
    // als.set('schema', response.schema, true)
}





// active switch for debugging logs
const debug = JSON.parse(process.env.RSSR_FETCHER_DEBUG);

function debugLog(msg, DUCT) {
    if (debug)
        console.info('FETCH > ' + msg + '. route: ', DUCT.req.originalUrl)
}
