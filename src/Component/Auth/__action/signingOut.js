import {setLocalUserAsGuest} from "./setLocalUserAsGuest";
import Cookies from "js-cookie";


/**
 * signing out user
 * clear localUser data in redux and set Guest User value to it.
 */
export const signingOut = () => {
    // clear user detail from redux
    setLocalUserAsGuest();

    // clear user token cookie
    Cookies.remove('localUserToken')

    /**
     * @@@ Clear_USER_Cart
     */
}
