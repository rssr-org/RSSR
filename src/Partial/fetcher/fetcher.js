import {IS_SERVER} from "../../setup/constant";
import {serverFetcher} from "./serverFetcher";
import {clientFetcher} from "./clientFetcher";



/**
 * fetcher is a HOC provider
 *
 * Fetcher is a HOC and wrap 'TheComponent'
 * to can handel fetching data actions of 'TheComponent'
 *
 * Fetcher in client contian all fetch actions
 * but in server just an interface
 * to pass duct to 'TheComponent' when type of fetch is props base
 * an in redux base is an empty component
 * (need empty component to avoid React 'compoenet not found' error)
 *
 * TheComponent: React Component
 * returns {Fecher}:  Fetcher Component
 */
export const fetcher = (TheComponent) => {
    let Fecher;
    
    if (IS_SERVER)
        Fecher = serverFetcher(TheComponent);
    else
        Fecher = clientFetcher(TheComponent);


    // clone static props
    Object.getOwnPropertyNames(TheComponent).forEach(function (key) {
        if (!Fecher.hasOwnProperty(key))
            Fecher[key] = TheComponent[key];
    });

    return Fecher;
}
