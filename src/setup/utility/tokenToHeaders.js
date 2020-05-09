import {IS_SERVER} from "../constant";
import {getStore} from "trim-redux";

// set {Authorization: "Bearer --token--"}
export const tokenToHeaders = function (headers = {}, token, req) {

    if (!token) {
        if (IS_SERVER)
            token = req ? req.cookies.token : undefined;
        else
            token = getStore('user').token;
    }

    if (!token)
        return headers;

    headers.Authorization = "Bearer " + token;
    return headers;
}
