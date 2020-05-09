import {setLocalUserAsGuest} from "./setLocalUserAsGuest";
import {authentication} from "./authentication";
import Cookies from "js-cookie";

export const firstSetup = function () {
    const token = Cookies.get('token');
    if (token) {
        // Real user
        // when token exists it means that one user has logged-in before
        // but it does not mean that the user is valid, so token needs authentication.
        //
        // when the server says the token is valid, then it's a real and valid user, and
        // when  the server says it is NOT valid then signingOut() method will run and
        // we set user as a Guest user and remove token from localstorage.
        authentication()
            .then(() => {
                /**
                 * @@@ GET_USER_CART
                 */
            })
            .catch(() => {
                /**
                 * @@@ Clear_USER_Cart
                 */
            })
    } else {
        // Guest user
        setLocalUserAsGuest()
    }
}
