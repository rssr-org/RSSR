import {errorLogger} from "./errorLogger";

/**
 * convert axios error object to valid data object for SSR ::3::
 * see fetcher/clientFetcher and server/fetchProvider
 *
 * @param error {object}
 * @returns {{data: {code: *, error: boolean}, status: null}}
 */
export const convertErrorToResponse = function (error, req) {
    let response = {
        status: null,
        data: {
            isErrorData: true,
            code: error.code
        }
    };

    if (error.response) {
        response.status = error.response.status;
        response.data.data = error.response.data;
    }
    // handel request time out error
    else if (error.code === 'ECONNABORTED') {
        response.status = 504;
        response.data.data = 'عدم پاسخ دهی API در زمان تعیین شده!\n' + error.message;
    }
    // handel internet not found error
    else if (error.code === 'ENOTFOUND') {
        response.status = 502;
        response.data.data = 'قطع اتصال اینترنت!\n' + error.message;
    }

    if (response.status !== null) {
        // none-200 status (3**, 4**, 5**), request timeout and internet not found
        response.data.status = response.status;

        if (response.status === 504 || response.status === 502)
            errorLogger('FETCH >', error, false, req);

        return response;
    } else {
        // internal errors (like semantic errors) and other request errors (with out timeout)
        throw error;
    }
}