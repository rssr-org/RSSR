import {getStore} from "trim-redux";
import {isSet} from "./checkSet";

/**
 * check user in the past loged in or not and token is valid or not
 *
 * @param updateIsRequired {boolean} : if set it false then user is valid just when has token
 * @returns {boolean}
 */
export const isValidUser = (updateIsRequired = true) => {
    const localUser = getStore('localUser');

    if (!isSet(localUser)){
        console.error('❗ localUser not exist in store!')
        return false;
    }

    if(localUser.token === null)
        return false;

    if(updateIsRequired)
        return localUser.updated;
    else
        return true;
}
