import {setLocalUserAsGuest} from "./setLocalUserAsGuest";
import Cookies from "js-cookie";


/**
 * signing out user
 * clear user data in redux and set Guest User value to it.
 */
export const signingOut = () => {
    // clear user detail from redux
    setLocalUserAsGuest();

    // clear user token cookie
    Cookies.remove('token')

    /**
     * @@@ Clear_USER_Cart
     */
}
