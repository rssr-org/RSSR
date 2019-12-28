import {setStore} from "trim-redux";


/**
 * set "updated: true" to stop loading of need Authentication Components and
 * set "token: null" becuse user is invalid (is guest)
 * NOTICE: localUser of guest user does not "detail" property.
 */
export const setLocalUserAsGuest = function () {
    setStore({localUser: {updated: true, token: null}});
}
