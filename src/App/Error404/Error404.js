import React from 'react';
import {Helmet} from "react-helmet-async";
import {browserHistory} from "../../setup/browserHistory";
import {Link} from "react-router-dom";
import {route} from "../../setup/route";
// import axios from "axios";


function Error404() {

    // function traffic() {
    //     const routes = ['/', '/post/0', '/post/1', '/post/2', '/post/3', '/sign/in', '/sign/up', '/404']
    //
    //     for (let i = 1; i <= 700; i++) {
    //         const randomRoute = routes[Math.floor(Math.random() * routes.length)]
    //         let proccessTimeStart = Date.now();
    //
    //         axios({
    //             url: 'http://localhost:8000' + randomRoute
    //         })
    //             .then(() => {
    //                 console.log('OK: ' + randomRoute + ' ' + (Date.now() - proccessTimeStart) + 'ms')
    //             })
    //             .catch(() => {
    //                 console.log('error: ' + randomRoute + ' ' + (Date.now() - proccessTimeStart) + 'ms')
    //             })
    //     }
    // }

    return (
        <div className="container mb-3">
            <Helmet title="page not found"/>
            <div className="row">
                <div className="col-12 text-center pt-5">
                    <h3>Oops, page not found!</h3>
                    <div className="py-3">
                        <img src="/asset/img/error-404.png" alt="page not found"/>
                    </div>
                    {/*<button className="btn btn-danger mr-3" onClick={traffic}>traffic</button>*/}
                    <button className="btn btn-secondary" onClick={browserHistory.goBack}>Back</button>
                    <Link to={route.home} className="btn btn-primary ml-3">Home</Link>
                </div>
            </div>
        </div>
    )
}

export default Error404;
