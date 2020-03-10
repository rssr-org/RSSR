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
 *
 * param TheComponent : React component <Required>
 * param fetchFn : fetch function <Required>
 * param reduxState : name of redux state <custom>: default is name of TheComponent
 * returns {Fecher}
 */
export const fetcher = (TheComponent, fetchFn, stateName) => {
    let Fecher;

    TheComponent.stateName = stateName;
    TheComponent.fetch = fetchFn

    if (IS_SERVER)
        Fecher = serverFetcher(TheComponent, stateName);
    else
        Fecher = clientFetcher(TheComponent);

    Fecher.stateName = stateName;
    Fecher.fetch = fetchFn

    return Fecher;
}
