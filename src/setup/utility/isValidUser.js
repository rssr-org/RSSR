import {getStore} from "trim-redux";
import Cookies    from "js-cookie";


/**
 * check if the user has logged-in before or not and token is valid or not
 *
 * @param updateIsRequired {boolean} : if it is set to false then user is valid just when has token
 * @returns {boolean}
 */
export const isValidUser = (updateIsRequired = true) => {
    const user = getStore('user');

    if (user === undefined) {
        console.error('❗ user not exist in store!')
        return false;
    }
    
    if (!Cookies.get('token'))
        return false;

    if (updateIsRequired)
        return user.updated;
    else
        return true;
}
