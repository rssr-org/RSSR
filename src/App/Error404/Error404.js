import React from 'react';
import {Helmet} from "react-helmet-async";
import {browserHistory} from "../../setup/browserHistory";
import {Link} from "react-router-dom";
import {route} from "../../setup/route";


function Error404() {
    return (
        <div className="container mb-3">
            <Helmet title="page not found"/>
            <div className="row">
                <div className="col-12 text-center pt-5">
                    <h3>Oops, page not found!</h3>
                    <div className="py-3">
                        <img src="/asset/img/error-404.png" alt="page not found"/>
                    </div>
                    <button className="btn btn-secondary" onClick={browserHistory.goBack}>Back</button>
                    <Link to={route.home} className="btn btn-primary ml-3">Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Error404;
