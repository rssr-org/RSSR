import {setStore} from "trim-redux";


/**
 * set "updated: true" when the user authentication is done by server and the user information is updated and final
 * set "token: null" when user is invalid (is guest)
 * NOTICE: The localUser object of guest user does not have "detail" property.
 */
export const setLocalUserAsGuest = function () {
    setStore({localUser: {updated: true, token: null}});
}
