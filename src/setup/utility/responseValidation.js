/**
 * check data contain valid data and status property ::3::
 * see fetcher/clientFetcher and server/fetchProvider
 *
 * @param response
 */
export const responseValidation = function (response) {
    // response not found
    if (typeof response === "undefined")
        throw new Error("⛔ invalid fetch() response. response is undefined. response must be an object with 'status' and 'data' property.");

    // exist data and status
    if (!response.hasOwnProperty('data') || !response.hasOwnProperty('status'))
        throw new Error('⛔ invalid fetch() response. check axios returns, "data" and "status" is required properties in response.');

    // status data type
    if (typeof response.status !== 'number')
        throw new Error('⛔ invalid status data type of fetch() response. status data type must be number like 404. status is ' + response.status + ' with type ' + typeof response.status);

    // status valid range
    if (response.status < 100 || response.status >= 600)
        console.warn('📌 value of "status" is not in valid range (1** to 5**). status is ' + response.status)
}
