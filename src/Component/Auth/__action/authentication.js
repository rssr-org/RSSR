import axios            from "axios";
import {api}            from "../../../setup/api";
import {setStore}       from "trim-redux";
import {toast}          from "react-toastify";
import {signingOut}     from "./signingOut";


/**
 * authentication
 * this method do two action. validation token and get user details and set to redux.
 *
 * @param token <string>: user authentication key. like "eyJ0eXAiOiJKV1QiLCJhbGciOiJ...."
 * @returns {Promise<any>}: when user is valid do then and when invalid do catch
 */
export const authentication = () => {
    return axios({url: api.userDetails})
        .then((response) => {
            // token is valid and user details ready to use
            setStore({
                user: {
                    updated: true,
                    detail : response.data
                }
            });
        })
        .catch((e) => {
            // token is invalid or occur an error
            signingOut();
            toast.error('authentication error. please log in again.');
            console.error(e);
        });
}
