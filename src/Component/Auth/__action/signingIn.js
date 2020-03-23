import {authentication} from "./authentication";
import Cookies from "js-cookie";

/**
 * signing in user
 * push token to localStorage (change null to token string) just when user checked "remember me" checkbox.
 * NOTICE: if user did not check the "remember me" checkbox, stay logged-in until the page refreshes.
 *
 * @param token <string>: user authentication key. like "eyJ0eXAiOiJKV1QiLCJhbGciOiJ...."
 * @param rememberMe <boolean>: state of "remember me" checkbox checked
 */
export const signingIn = (token, rememberMe) => {
    // set local user token when rememberMe is checked
    if (rememberMe)
        Cookies.set('localUserToken', token)

    // token validation and get user detail
    return authentication(token)
        .then(() => {
            /**
             * @@@ GET_USER_CART
             */
        });
}
