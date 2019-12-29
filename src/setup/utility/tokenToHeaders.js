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
        console.log('🚩 tokenToHeaders > user is invalid. IF authentication is required check user validation before call API and tokenToHeaders() ELSE ignore this message.');
        return headers;
    }

    headers.Authorization = "Bearer " + token;
    return headers;
}
