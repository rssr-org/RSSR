/**
 * read and write to localstrage
 */

export const storage = {
    /**
     * check varName defined in localstorage or not
     *  NOTICE: retunr false just when does not exist (when exist with undefined or false value then return true)
     *
     * @param varName
     * @returns {boolean}
     */
    isSet: function (varName) {
        return localStorage.getItem(varName) !== null;
    },




    /**
     * set value just when varName does not exist
     *
     * @param <string>: name of variable
     * @returns {boolean}
     */
    init: function (varName, value) {
        if (!storage.isSet(varName))
            storage.set(varName, value);
    },




    /**
     * get value of varName
     *
     * @param varName <string>: name of variable
     * @returns {any}: value of variable (return undefined if does not exist or exist with undefined value)
     */
    get: function (varName) {
        if (!storage.isSet(varName) || localStorage[varName] === "undefined")
            return;

        return JSON.parse(localStorage[varName]);
    },





    /**
     * update value of varName
     *
     * @param varName <string>: name of variable
     * @param value
     */
    set: function (varName, value) {
        if (typeof varName === "undefined")
            throw new Error("storage.set() error: variable name is undefined!");

        localStorage[varName] = JSON.stringify(value);
    }
}

