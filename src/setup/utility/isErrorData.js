import {dataType} from "rssr-data-type";

/**
 * check data type is error or not
 * compatible with convertErrorToResponse()
 * see fetcher/clientFetcher and server/fetchProvider
 *
 * @param data {*}
 * @returns {boolean|*}
 */
export const isErrorData = (data) => dataType(data) === 'object' && data.isErrorData
