import {createBrowserHistory} from "history";
import {IS_BROWSER} from "./constant";


// create a browser history
export const browserHistory = (IS_BROWSER) ? createBrowserHistory() : {push: () => ''};
