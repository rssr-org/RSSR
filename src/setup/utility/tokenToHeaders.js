import {IS_SERVER} from "../constant";
import {getStore} from "trim-redux";

// set {Authorization: "Bearer --token--"}
export const tokenToHeaders = function (headers = {}, token, req) {

    if (!token) {
        if (IS_SERVER)
            token = req ? req.cookies.localUserToken : undefined;
        else
            token = getStore('localUser').token;
    }

    if (!token) {
        console.warn('tokenToHeaders: you need token but user is invalid! if is required check user validation before call axios.');
        return headers;
    }

    headers.Authorization = "Bearer " + token;
    return headers;
}
