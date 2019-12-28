import {dataType} from "./dataType";

/**
 * check data type is error or not ::3::
 * compatible with convertErrorToResponse()
 * see fetcher/clientFetcher and server/fetchProvider
 *
 * @param data {*}
 * @returns {boolean|*}
 */
export const isErrorData = (data) => dataType(data) === 'object' && data.isErrorData
