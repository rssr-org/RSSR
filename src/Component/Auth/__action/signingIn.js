import {authentication} from "./authentication";
import {cookie} from "../../../setup/utility/cookie";

/**
 * signing in user
 * push token to localStorage (change null to token string) just when user checked "remember me" checkbox.
 * NOTICE: if user do not checked "remember me" stay loged in Until the page refreshes.
 *
 * @param token <string>: user authentication key. like "eyJ0eXAiOiJKV1QiLCJhbGciOiJ...."
 * @param rememberMe <boolean>: state of "remember me" checkbox checked
 */
export const signingIn = (token, rememberMe) => {
    // set local User Token when rememberMe
    if (rememberMe)
        cookie.set('localUserToken', token)

    // token validation and get user detail
    return authentication(token)
        .then(() => {
            /**
             * @@@ GET_USER_CART
             */
        });
}
