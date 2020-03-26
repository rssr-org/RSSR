import React from "react";
import {connect} from "trim-redux";
import {isErrorData} from "../../setup/utility/isErrorData";
import DefaultErrors from "./DefaultErrors";

/**
 *  provider Fetcher HOC of server side
 *
 * Fetcher HOC in server is just an interface which passes the fetched data in 
 * redux state to 'TheComponent' 
 *
 * @param TheComponent : React Component
 * @returns {Fecher} : Fetcher HOC of server side
 */
export const serverFetcher = function (TheComponent, stateName) {

    let Fecher = function (props) {

        const data = props[stateName]

        // handle errors
        if (isErrorData(data))
            return <DefaultErrors data={data}/>

        // connect  to redux
        const mstp = state => ({
            [stateName]: state[stateName]
        })

        TheComponent = connect(mstp)(TheComponent);

        return <TheComponent {...props} />;
    }

    return connect(s => ({[stateName]: s[stateName]}))(Fecher);
}
