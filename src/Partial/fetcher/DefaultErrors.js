import React from 'react';
import {Helmet} from "react-helmet-async";
import Error404 from "../../App/Error404/Error404";
import {browserHistory} from "../../setup/browserHistory";


// use for catching axios error during the fetching process with fetcher
// NOTICE: all non0-200 response status will be catched by this view unless you write catch in fetch function for them
const DefaultErrors = (props) => {
    const {status, code, data} = props.data;

    if (status === 404)
        return <Error404/>

    return (
        <div id="derr" className="container-fluid mb-3">
            <Helmet title={`Erorr ${status}`}/>
            <div className="row">
                <div className="col-lg-8 offset-lg-2 text-center">
                    <h4 className="py-5">Error {status}</h4>
                    <pre>{JSON.stringify(data)}</pre>
                    <code>
                        {code ? code : ''}
                    </code>
                    <hr/>
                    <button className="btn btn-secondary ml-3 mt-4" onClick={() => browserHistory.goBack()}>
                        <i className="fa fa-angle-right font-weight-bold ml-1"></i>
                        ‌Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DefaultErrors;
