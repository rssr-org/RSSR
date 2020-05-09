import {authentication} from "./authentication";
import Cookies from "js-cookie";

/**
 * signing in user
 *
 * @param token <string>: user authentication key. like "eyJ0eXAiOiJKV1QiLCJhbGciOiJ...."
 * @param rememberMe <boolean>: state of "remember me" checkbox checked
 */
export const signingIn = (token, rememberMe) => {
    // push token to cookie just when user checked "remember me" checkbox.
    // NOTICE: if user did not check the "remember me" checkbox, stay logged-in until the page refreshes.
    // NOTICE: when your server side setting cookike
    // you must remove this part of code
    if (rememberMe)
        Cookies.set('token', token)

    // token validation and get user detail
    return authentication()
        .then(() => {
            /**
             * @@@ GET_USER_CART
             */
        });
}
