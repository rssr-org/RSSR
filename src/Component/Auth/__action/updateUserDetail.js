import {authentication} from "./authentication";
import {cookie} from "rssr-cookie";

// refetch user details
export const updateUserDetail = () => {
    const token = cookie.get('localUserToken');
    return authentication(token);
}
