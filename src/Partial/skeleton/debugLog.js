// active switch for debuging logs
const debug = JSON.parse(process.env.RSSR_SKELETON_DEBUG);

export const debugLog = function (msgKey) {
    if (!debug)
        return;

    let msg;
    switch (msgKey) {
        case "INVALID_CACHE_VALUE":
            msg = 'cache property is not number or more than ziro miliseconds. set skeleton cache parameter.';
            break;
        case "WENT_WELL":
            msg = 'everything went well, data successfully fetched in Server and received on Client.';
            break;
        case "FETCHED_IN_CLIENT":
            msg = 'fetch errored in server but data successfully fetched in Client.';
            break;
        case "CLIENT_ERRORED":
            msg = 'fetch errored in both side.the default data is now used.';
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
            msg = 'data fetched successfully in server and pushed to skeleton state.';
            break;
        case "SERVER_ERRORED":
            msg = 'fetch errored in server.';
            break;
        default:
            msg = 'message key is invalid!'
    }

    msg = '[' + msgKey + '] ' + msg;

    console.info('SKELETON > ' + msg)
}
