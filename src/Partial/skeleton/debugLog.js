// active switch for debugging logs
const debug = JSON.parse(process.env.RSSR_SKELETON_DEBUG);

export const debugLog = function (msgKey) {
    if (!debug)
        return;

    let msg;
    switch (msgKey) {
        case "INVALID_CACHE_VALUE":
            msg = 'cache property is not number or more than zero milliseconds. set skeleton cache parameter.';
            break;
        case "WENT_WELL":
            msg = 'everything went well, data was successfully fetched in Server and was received by Client.';
            break;
        case "FETCHED_IN_CLIENT":
            msg = 'fetch errored in server but data was successfully fetched in Client.';
            break;
        case "CLIENT_ERRORED":
            msg = 'fetch had error in both sides.The default data is now used.';
            break;
        case "READ_FROM_CACHE":
            msg = 'read data from cache.';
            break;
        case "CACHE_EXPIRED":
            msg = 'delete expired cache.';
            break;
        case "CACHING_DATA":
            msg = 'caching fetched data.';
            break;
        case "FETCHING_API":
            msg = 'fetching data from API.';
            break;
        case "SUCCESSFULLY_FETCH":
            msg = 'data was fetched successfully in server and pushed to skeleton state.';
            break;
        case "SERVER_ERRORED":
            msg = 'fetch had error in server.';
            break;
        default:
            msg = 'message key is invalid!'
    }

    msg = '[' + msgKey + '] ' + msg;

    console.info('SKELETON > ' + msg)
}
