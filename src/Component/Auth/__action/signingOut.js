import {setLocalUserAsGuest} from "./setLocalUserAsGuest";
import {cookie} from "../../../setup/utility/cookie";


/**
 * signing out user
 * clear localUser data in redux and set Gust User value to it.
 */
export const signingOut = () => {
    // clear user detail from redux
    setLocalUserAsGuest();

    // clear user token cookie
    cookie.remove('localUserToken')

    /**
     * @@@ Clear_USER_Cart
     */
}