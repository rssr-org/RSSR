/**
 * check data type is error or not
 * compatible with convertErrorToResponse()
 * see fetcher/clientFetcher and server/fetchProvider
 *
 * @param data {*}
 * @returns {boolean|*}
 */
export const isErrorData = (data) => data && data.isErrorData
