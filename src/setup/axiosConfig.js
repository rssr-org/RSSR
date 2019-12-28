import axios from "axios";
import {API_DOMAIN} from "./constant";

// set Global axios defaults
axios.defaults.baseURL = API_DOMAIN;
axios.defaults.timeout = 58000; // fix uncontroled server 502 Error

/************************* AXIOS template *************************
 axios({
    url: api,
    method: 'POST',
    headers: tokenToHeaders(),
    data: {
        test: 'test' // your data params
    }
})
 .then((response) => {
        //  transpile actions
        return response; // required for fetch()
    })
 .catch(function (err) {
        // if (err.response && err.response.status === 400)
        //    return toast.error('your custom error');
        //
        // badConnectionAlert('whereOf');
    })


 ***************************************************************/