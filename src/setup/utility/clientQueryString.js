import {IS_SERVER} from "../constant";

/**
 * convert Query string to object
 */
export const clientQueryString = () => {
    // ignore server render
    if (IS_SERVER)
        return;

    let params = {};
    const queryString = window.location.search;

    if (queryString === '')
        return params;

    queryString.slice(1).split('&').forEach((item) => {
        const
            index = item.indexOf('='),
            name = item.slice(0, index),
            value = item.slice(index + 1),
            key = decodeURIComponent(name),
            vlaue = (value !== undefined) ? decodeURIComponent(value.replace(/(%20)/g, () => ' ')) : '';
        //
        params[key] = vlaue;
    });

    return params;
}
