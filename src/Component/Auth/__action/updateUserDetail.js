import {authentication} from "./authentication";
import Cookies from "js-cookie";

// refetch user details
export const updateUserDetail = () => {
    const token = Cookies.get('localUserToken');
    return authentication(token);
}
